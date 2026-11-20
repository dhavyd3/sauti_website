"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ButtonIcon } from "./Button";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "busy" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Posts to app/api/contact/route.ts, which emails the message to the team
 * through Zoho Mail. Field names here must match the ones the route reads.
 */
export function ContactForm() {
  const [topic, setTopic] = useState<string>(contact.topics[0].value);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  // /contact?topic=investor preselects the topic.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("topic");
    if (!requested || !contact.topics.some((item) => item.value === requested)) return;
    const id = requestAnimationFrame(() => setTopic(requested));
    return () => cancelAnimationFrame(id);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    const next: Errors = {};
    if (!value("name")) next.name = "Please tell us your name.";
    if (!EMAIL.test(value("email"))) next.email = "Please enter an email address we can reply to.";
    if (value("message").length < 10) next.message = "Please write a few words about what you would like to discuss.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (response.status === 429) {
        setStatus("busy");
        return;
      }
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      form.reset();
      setTopic(contact.topics[0].value);
    } catch {
      setStatus("error");
    }
  }

  const fieldProps = (name: keyof Errors) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `cf-${name}-error` : undefined,
  });

  return (
    <form className="form" name="contact" onSubmit={onSubmit} noValidate>

      <div className="form__pair">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required {...fieldProps("name")} />
          {errors.name && <p id="cf-name-error" className="field__error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="cf-org">
            Organisation <span>(optional)</span>
          </label>
          <input id="cf-org" name="organisation" type="text" autoComplete="organization" />
        </div>
      </div>

      <div className="form__pair">
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" required {...fieldProps("email")} />
          {errors.email && <p id="cf-email-error" className="field__error">{errors.email}</p>}
        </div>
        <div className="field">
          <label htmlFor="cf-phone">
            Phone or WhatsApp <span>(optional)</span>
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </div>
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

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={6} required {...fieldProps("message")} />
        {errors.message && <p id="cf-message-error" className="field__error">{errors.message}</p>}
      </div>

      {/* Left empty by people; filled by bots. The server drops messages that fill it. */}
      <div className="form__hp" aria-hidden="true">
        <label htmlFor="cf-website">Leave this empty</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send message"}
          <ButtonIcon />
        </button>
        <p className="form__note">{contact.emergencyNote}</p>
      </div>

      <div aria-live="polite">
        {status === "sent" && <p className="form__status form__status--ok">Thank you. Your message has been sent and we will reply by email.</p>}
        {status === "busy" && (
          <p className="form__status form__status--error">
            Several messages have just been sent from this connection. Please wait ten minutes and try again, or email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
        {status === "error" && (
          <p className="form__status form__status--error">
            Your message could not be sent. Please try again, or email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or{" "}
            <a href={`https://wa.me/${site.phones[0].whatsapp}`} target="_blank" rel="noopener noreferrer">
              message us on WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
