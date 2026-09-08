The Clarity Chamber — technical update pack
==========================================

What changed in these files
---------------------------
1. Canonical URLs + ProfessionalService JSON-LD on every page.
2. FAQPage schema on faq.html.
3. Offer catalog schema on readings.html (AUD $60 / $80 / $100 packages).
4. Person schema on about.html.
5. Footer link to cancel.html on all pages.
6. contact.html:
   - 18+ / legal consent checkbox (required)
   - honeypot field (spam)
   - ?package=live-60 (and other package codes) prefill
   - existing ?type= and ?topic= still work
   - GA4 generate_lead on successful submit
   - link to cancel a booking
7. cards.html: URL hash support, e.g. cards.html#the-fool
8. robots.txt: Disallow /cancel.html (page is already noindex)
9. twitter:card upgraded to summary_large_image

Not in this zip (need live assets / backend)
--------------------------------------------
- Stripe Checkout (form still posts to the existing Apps Script)
- WebP images / og-default.jpg 1200x630
- Shared CSS file / hamburger menu
- Clean URLs without .html

Deploy
------
Upload the HTML/XML/TXT over the existing site. Keep the images/ folder
on the server as-is (Logo.jpg, Collage.JPG, cards/, Loveleen.JPG, etc.).

Package query examples
----------------------
contact.html?type=live&package=live-60&topic=Career
contact.html?type=recorded&package=rec-7&topic=Relationships
cards.html#the-star
