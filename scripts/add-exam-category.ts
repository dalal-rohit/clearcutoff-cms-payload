/**
 * Add a new "Exam Preparation" FAQ category (English + Hindi) to the
 * existing `faq` global, without disturbing the categories already there.
 *
 * IMPORTANT: unlike seed-faq.ts (which writes the whole `categories` array
 * from scratch), this reads the current doc first and keeps every existing
 * row's `id` intact before writing back — Payload's Postgres adapter
 * replaces array rows wholesale on write, so omitting existing ids would
 * silently drop their other-locale data (see seed-faq.ts's comment for the
 * bug this caused originally).
 *
 * Usage: pnpm tsx scripts/add-exam-category.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type LocalizedQuestion = { question: { en: string; hi: string }; answer: { en: string; hi: string } }

const NEW_CATEGORY = {
  key: 'examCoverage',
  label: { en: 'Exam preparation', hi: 'एग्ज़ाम की तैयारी' },
  questions: [
    {
      question: {
        en: 'Which teaching exams does Clear Cutoff cover?',
        hi: 'Clear Cutoff कौन-कौन से Teaching Exams कवर करता है?',
      },
      answer: {
        en: 'Clear Cutoff currently covers CTET, HTET, UPTET, REET, and HPTET, with dedicated Previous Year Questions, video lectures, and test series for each exam.',
        hi: 'Clear Cutoff अभी CTET, HTET, UPTET, REET और HPTET कवर करता है, हर एग्जाम के लिए अलग Previous Year Questions, वीडियो लेक्चर और टेस्ट सीरीज़ के साथ।',
      },
    },
    {
      question: {
        en: "What's the difference between Paper 1 and Paper 2 in teaching exams?",
        hi: 'Teaching Exams में Paper 1 और Paper 2 में क्या अंतर है?',
      },
      answer: {
        en: 'Paper 1 is for candidates who want to teach classes 1–5 (primary level), and Paper 2 is for classes 6–8 (upper primary level). Candidates who want to teach both levels can appear for both papers.',
        hi: 'Paper 1 उन उम्मीदवारों के लिए है जो कक्षा 1-5 (प्राइमरी लेवल) पढ़ाना चाहते हैं, और Paper 2 कक्षा 6-8 (अपर प्राइमरी लेवल) के लिए है। जो दोनों लेवल पढ़ाना चाहते हैं वे दोनों पेपर दे सकते हैं।',
      },
    },
    {
      question: {
        en: 'Is there negative marking in these exams?',
        hi: 'क्या इन एग्जाम्स में नेगेटिव मार्किंग होती है?',
      },
      answer: {
        en: "Most teaching exams like CTET, HTET, and UPTET do not have negative marking, but this can vary by state — always check the official notification for the exam you're appearing for. Clear Cutoff's test series follows the latest official marking pattern for each exam.",
        hi: 'ज़्यादातर Teaching Exams जैसे CTET, HTET और UPTET में नेगेटिव मार्किंग नहीं होती, लेकिन यह राज्य के हिसाब से अलग हो सकता है — हमेशा अपने एग्जाम की आधिकारिक नोटिफिकेशन चेक करें। Clear Cutoff की टेस्ट सीरीज़ हर एग्जाम के लेटेस्ट मार्किंग पैटर्न को फॉलो करती है।',
      },
    },
    {
      question: {
        en: 'How long is a teaching exam qualifying certificate valid?',
        hi: 'Teaching Exam का qualifying certificate कितने समय के लिए वैध होता है?',
      },
      answer: {
        en: "Certificate validity depends on the conducting body's current policy — several exams have been made valid for a lifetime in recent years. Always check the latest official notification for your specific exam, since rules are occasionally updated.",
        hi: 'सर्टिफिकेट की वैधता कंडक्टिंग बॉडी की मौजूदा पॉलिसी पर निर्भर करती है — हाल के वर्षों में कई एग्जाम्स के लिए इसे लाइफटाइम वैध कर दिया गया है। अपने एग्जाम की लेटेस्ट आधिकारिक नोटिफिकेशन ज़रूर चेक करें।',
      },
    },
    {
      question: {
        en: 'How do Previous Year Questions (PYQs) help in exam preparation?',
        hi: 'Previous Year Questions (PYQs) तैयारी में कैसे मदद करते हैं?',
      },
      answer: {
        en: 'PYQs show you the exact difficulty level, question pattern, and frequently repeated topics for your exam. Practicing them builds familiarity with the real exam format and helps you spot which chapters deserve more revision time.',
        hi: 'PYQs से आपको अपने एग्जाम का सही डिफिकल्टी लेवल, क्वेश्चन पैटर्न और बार-बार आने वाले टॉपिक्स पता चलते हैं। इनकी प्रैक्टिस से असली एग्जाम फॉर्मेट से जान-पहचान बढ़ती है और पता चलता है कि किन चैप्टर्स पर ज्यादा रिविजन चाहिए।',
      },
    },
    {
      question: {
        en: 'Can I switch between exams (e.g., from CTET to HTET) after buying a course?',
        hi: 'क्या कोर्स खरीदने के बाद मैं एक एग्जाम से दूसरे एग्जाम (जैसे CTET से HTET) में स्विच कर सकता हूं?',
      },
      answer: {
        en: "Course content is exam-specific since each exam has its own syllabus and pattern. If you need to switch your course after purchase, contact our support team and we'll guide you through it.",
        hi: 'कोर्स कंटेंट एग्जाम-स्पेसिफिक होता है क्योंकि हर एग्जाम का अपना सिलेबस और पैटर्न होता है। खरीदने के बाद कोर्स स्विच करने में मदद चाहिए तो हमारी सपोर्ट टीम से संपर्क करें, हम आपकी मदद करेंगे।',
      },
    },
  ] satisfies LocalizedQuestion[],
}

async function run() {
  const payload = await getPayload({ config })

  const doc: any = await payload.findGlobal({ slug: 'faq', locale: 'all', depth: 0 })
  const existingCategories = doc?.categories ?? []

  if (existingCategories.some((c: any) => c.key === NEW_CATEGORY.key)) {
    payload.logger.info(`Category "${NEW_CATEGORY.key}" already exists — skipping.`)
    process.exit(0)
  }

  await payload.updateGlobal({
    slug: 'faq',
    locale: 'all',
    data: { categories: [...existingCategories, NEW_CATEGORY] },
  })

  payload.logger.info(`Added "${NEW_CATEGORY.key}" category (${NEW_CATEGORY.questions.length} questions, en + hi).`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Failed to add exam-coverage category:', err)
  process.exit(1)
})
