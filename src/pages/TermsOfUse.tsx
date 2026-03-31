import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the RiseMaster platform, users agree to be bound by these Terms of Use. If the user does not agree to these terms, they should discontinue use of the platform.",
    ],
  },
  {
    title: "2. Description of the Service",
    content: [
      "RiseMaster is an AI-powered adaptive learning platform designed to support students in improving their understanding of STEM subjects through personalized feedback and progress tracking. The system uses learning interaction data to estimate mastery and recommend appropriate learning content.",
      "The platform is intended for educational support purposes and does not replace formal instruction, grading systems, or professional academic guidance.",
    ],
  },
  {
    title: "3. Eligibility and User Accounts",
    bullets: [
      "Users must provide accurate and truthful information when creating an account.",
      "For users under the age of 18, parental or guardian consent may be required before using the system.",
      "Users are responsible for maintaining the confidentiality of their account credentials and for all activities conducted under their account.",
    ],
  },
  {
    title: "4. Acceptable Use of the Platform",
    content: [
      "Users agree to use the platform in a responsible and ethical manner. This includes:",
    ],
    bullets: [
      "Using the system strictly for educational purposes",
      "Not attempting to manipulate learning outcomes or mastery scores",
      "Not interfering with system functionality or attempting unauthorized access",
    ],
    footer:
      "Any misuse of the platform may result in suspension or termination of access.",
  },
  {
    title: "5. AI-Based Decision Making and System Limitations",
    content: [
      "RiseMaster uses artificial intelligence, specifically Bayesian Knowledge Tracing, to estimate user mastery and adapt learning content accordingly.",
      "Users acknowledge that:",
    ],
    bullets: [
      "AI-generated recommendations may not always be fully accurate",
      "Mastery estimates are probabilistic and not definitive measures of ability",
      "The system is designed to support learning, not to make high-stakes academic decisions",
    ],
    footer:
      "Users are encouraged to combine system feedback with guidance from teachers or other learning resources.",
  },
  {
    title: "6. Educational Integrity and Fair Use",
    content: [
      "The platform is designed to promote honest learning and improvement. Users should not use the system in a way that undermines learning integrity, such as attempting to game the system or bypass learning processes.",
      "The system encourages progress-based learning rather than performance comparison.",
    ],
  },
  {
    title: "7. Intellectual Property Rights",
    content: [
      "All content within the platform, including problems, system design, algorithms, and user interface elements, is the intellectual property of the developers or licensed sources.",
      "Users may not reproduce, distribute, or reuse content without permission, except for personal educational use.",
    ],
  },
  {
    title: "8. Privacy and Data Usage",
    content: [
      "The platform collects and processes user data in accordance with the Privacy Policy. By using the system, users consent to the collection of interaction data for learning personalization and system improvement.",
      "The platform commits to handling user data responsibly and securely.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    content: [
      "RiseMaster is provided as a prototype educational tool and may contain errors or limitations.",
      "The developers are not liable for:",
    ],
    bullets: [
      "Inaccurate mastery predictions",
      "Learning outcomes based on system use",
      "Decisions made by users based on system feedback",
    ],
    footer:
      "The system should not be used as the sole basis for academic or institutional decisions.",
  },
  {
    title: "10. Accessibility and System Availability",
    content: [
      "The platform may be subject to downtime, technical issues, or limited accessibility due to internet connectivity constraints.",
      "The developers do not guarantee uninterrupted access to the system.",
    ],
  },
  {
    title: "11. Termination and Suspension of Access",
    content: [
      "The platform reserves the right to suspend or terminate user access if these terms are violated or if misuse of the system is detected.",
    ],
  },
  {
    title: "12. Modifications to the Terms",
    content: [
      "These Terms of Use may be updated as the system evolves. Users will be informed of any significant changes, and continued use of the platform indicates acceptance of the updated terms.",
    ],
  },
  {
    title: "13. Governing Principles",
    content: [
      "These terms are guided by ethical principles of fairness, transparency, and responsible use of AI in education, as well as applicable data protection laws.",
    ],
  },
];

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-4xl font-bold text-foreground">
              Terms of Use
            </h1>
            <p className="text-primary">
              End User License Agreement (EULA) – RiseMaster
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h2 className="mb-3 text-lg font-semibold text-primary">
                  {section.title}
                </h2>

                {section.content?.map((para, i) => (
                  <p key={i} className="mb-3 leading-relaxed text-foreground">
                    {para}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mb-3 space-y-2 pl-2">
                    {section.bullets.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="mt-1 leading-relaxed text-muted-foreground italic">
                    {section.footer}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <p className="mt-10 text-center text-sm text-muted-foreground">
            By using RiseMaster, you acknowledge that you have read and agree to
            these Terms of Use.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfUse;
