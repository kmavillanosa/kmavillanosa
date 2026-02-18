---
title: Bill Tracker
date: 2025-12-27T00:16:00.000+08:00
description: This is an invoice generator
---
![Tracker](/kmavillanosa/cms/media/bill-tracker.png)

 
Track clients, timesheets, and invoices. Log time, generate PDFs and CSVs, and see your earnings in one place.


# **Features**

* **Authentication** — Register and sign in with JWT; session persisted in the app. 
* **Clients** — Add and edit clients with name, code, hourly rate, hours per day, currency, and branding (banner/headline/text colors).
* **Timesheets** — Log entries per client (date, summary, tags). Entries can be used when building invoices.
* **Invoices** — Create invoices from work items (title, description, date, hours). Generate PDF invoice and CSV timesheet; mark as released then received with a reference number.
* **Invoice management** — Edit existing invoices (note, date, work items) and delete invoices. Deleting an invoice also removes all its work items (entries).
* **Client deletion** — Deleting a client cascades: all timesheet entries, all invoices, and all related work items for that client are removed first.
* **Charts & analytics** — Dashboard with monthly income, client revenue distribution, status summary by currency, recent invoices, and optional client filter.
* **Multi-currency** — Per-client currency and optional converted-currency display (e.g. show amount in PHP when client uses USD).
