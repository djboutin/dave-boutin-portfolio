"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("submitting");
    const form = event.currentTarget;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => body.append(key, String(value)));
    try {
      const response = await fetch("/forms/contact.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
      if (!response.ok) throw new Error("Submission failed");
      form.reset(); setStatus("success");
    } catch { setStatus("error"); }
  }
  return <form className="contact-form" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
    <input type="hidden" name="form-name" value="contact" /><p className="honeypot"><label>Do not fill this out: <input name="bot-field" /></label></p>
    <label><span>Name</span><input name="name" type="text" autoComplete="name" required /></label>
    <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
    <label><span>What would you like to explore?</span><textarea name="message" rows={5} required /></label>
    <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Transmitting…" : "Send message"}<span aria-hidden="true">↗</span></button>
    <p className="form-status" aria-live="polite">{status === "success" && "Message received. I’ll be in touch."}{status === "error" && "Something went wrong. Please email me directly instead."}</p>
  </form>;
}
