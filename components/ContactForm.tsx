"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ButtonIcon } from "./Button";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const [topic, setTopic] = useState<string>(contact.topics[0].value);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  // /contact?topic=partnership preselects the topic.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("topic");
    if (!requested || !contact.topics.some((item) => item.value === requested)) return;
    const id = requestAnimationFrame(() => setTopic(requested));
    return () => cancelAnimationFrame(id);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please tell us your name.";
    if (!EMAIL.test(data.email?.trim() ?? "")) next.email = "Please enter an email address we can reply to.";
    if ((data.message?.trim().length ?? 0) < 10) next.message = "Please write a few words about what you would like to discuss.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("sent");
        form.reset();
        setTopic(contact.topics[0].value);
      } else {
        setStatus(response.status === 503 ? "unavailable" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const whatsapp = `https://wa.me/${site.phones[0].whatsapp}`;

  return (
    <form className="contact__form" onSubmit={onSubmit} noValidate>
      <div className="contact__pair">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "cf-name-error" : undefined} />
          {errors.name && (
            <p id="cf-name-error" className="field__error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="cf-org">Organisation (optional)</label>
          <input id="cf-org" name="organisation" type="text" autoComplete="organization" />
        </div>
      </div>

      <div className="contact__pair">
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "cf-email-error" : undefined} />
          {errors.email && (
            <p id="cf-email-error" className="field__error">
              {errors.email}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="cf-topic">I am reaching out about</label>
          <select id="cf-topic" name="topic" value={topic} onChange={(event) => setTopic(event.target.value)}>
            {contact.topics.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "cf-message-error" : undefined} />
        {errors.message && (
          <p id="cf-message-error" className="field__error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Left empty by people; filled by bots. */}
      <div className="contact__hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send message"}
          <ButtonIcon />
        </button>
      </div>

      <div aria-live="polite">
        {status === "sent" && <p className="form-status form-status--ok">Thank you. Your message has been sent and we will reply by email.</p>}
        {status === "unavailable" && (
          <p className="form-status form-status--error">
            The form is not connected yet, so your message was not sent. Please email{" "}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            or{" "}
            <a className="link" href={whatsapp} target="_blank" rel="noopener noreferrer">
              message us on WhatsApp
            </a>
            .
          </p>
        )}
        {status === "error" && (
          <p className="form-status form-status--error">
            Your message could not be sent. Please try again, or email{" "}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
