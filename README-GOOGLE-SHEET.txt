Connect the Diamond contractor form to a Google Sheet

You only need one item to wire this package to a Google Sheet:
- The deployed Google Apps Script Web App URL

Setup steps:

1. Create a new Google Sheet.
   Suggested name: Diamond Connect Contractor Submissions

2. Add a tab named:
   Responses

3. In the Google Sheet, go to:
   Extensions > Apps Script

4. Delete any starter code and paste the full contents of:
   google-apps-script.js

5. Optional:
   In google-apps-script.js, set NOTIFY_EMAIL to an internal email address if you want an email alert for every submission.
   Example:
   const NOTIFY_EMAIL = "yourname@company.com";

6. Save the Apps Script project.

7. Deploy it:
   Deploy > New deployment > Select type: Web app

8. Use these settings:
   Execute as: Me
   Who has access: Anyone

9. Copy the Web App URL.

10. Open questionnaire.html and find this line near the bottom:
    const GOOGLE_SCRIPT_URL = "";

11. Paste the Web App URL between the quotes.
    Example:
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/PASTE_YOUR_URL_HERE/exec";

12. Redeploy the Vercel site.

Important notes:
- Do not collect W-9s, COIs, insurance documents, or tax documents through this public form.
- This form sends answers only. Diamond should request documents separately after review.
- If GOOGLE_SCRIPT_URL is left blank, the form still goes to the thank-you page, but submissions will not be saved to Google Sheets.
