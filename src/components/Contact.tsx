"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 max-w-5xl mx-auto px-6 border-t border-white/10 text-center"
    >
      <h2 className="text-3xl font-bold text-white">
        Let&apos;s Build Together
      </h2>
      <p className="text-gray-400 mt-2 max-w-md mx-auto">
        Open for interesting project opportunities, collaborations, or frontend
        developer roles.
      </p>
      <div className="mt-6">
        <a
          href="mailto:your-email@example.com"
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
        >
          Start a Conversation
        </a>
      </div>
    </section>
  );
}
