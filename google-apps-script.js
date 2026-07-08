const SHEET_NAME = "Responses";
const NOTIFY_EMAIL = ""; // Optional: add an internal email address to receive a copy of each submission.

const HEADERS = [
  "Submitted At",
  "Form Name",
  "Page Source",
  "Company Name",
  "Primary Contact",
  "Phone",
  "Email",
  "Office City / State",
  "Website / Facebook",
  "Services",
  "Markets Served",
  "Travel Radius",
  "Number of Crews",
  "Typical Crew Size",
  "Equipment Owned",
  "Self-Perform or Subcontract",
  "Minimum Job Size",
  "Preferred Job Size",
  "Text Alerts",
  "General Liability",
  "Workers Comp",
  "W-9 Available",
  "COI Available",
  "Night / Weekend Availability",
  "Comfort Reviewing Work Online",
  "Work Interest",
  "Best Follow-Up Time",
  "Source",
  "Notes"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    const p = e.parameter || {};
    const params = e.parameters || {};
    const services = params.services ? params.services.join(", ") : "";

    const row = [
      new Date(),
      p.form_name || "",
      p.page_source || "",
      p.company || "",
      p.contact || "",
      p.phone || "",
      p.email || "",
      p.office || "",
      p.website || "",
      services,
      p.markets || "",
      p.travel || "",
      p.crews || "",
      p.crew_size || "",
      p.equipment || "",
      p.self_perform || "",
      p.minimum || "",
      p.preferred_size || "",
      p.text_alerts || "",
      p.gl || "",
      p.wc || "",
      p.w9 || "",
      p.coi || "",
      p.night_weekend || "",
      p.tech || "",
      p.interest || "",
      p.follow_up || "",
      p.source || "",
      p.notes || ""
    ];

    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New Diamond contractor info submission: " + (p.company || "Company submitted"),
        body: buildNotificationBody_(p, services)
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function buildNotificationBody_(p, services) {
  return [
    "New Diamond contractor info submission",
    "",
    "Company: " + (p.company || ""),
    "Contact: " + (p.contact || ""),
    "Phone: " + (p.phone || ""),
    "Email: " + (p.email || ""),
    "Office: " + (p.office || ""),
    "Services: " + services,
    "Markets: " + (p.markets || ""),
    "Travel: " + (p.travel || ""),
    "Crews: " + (p.crews || ""),
    "Preferred Job Size: " + (p.preferred_size || ""),
    "Notes: " + (p.notes || "")
  ].join("\n");
}
