# Security Headers Specification

## Purpose

Define the security headers served with every page of the Vercel-deployed static site — Content Security Policy, clickjacking protection, and HTTPS transport enforcement.

## Requirements

### Requirement: SEC-HEADERS-001 — Content Security Policy

The site MUST serve a `Content-Security-Policy` header restricting resources to `default-src 'self'` with explicit allowances for Google Fonts and WhatsApp external links.

#### Scenario: CSP blocks inline scripts

- GIVEN a page is served from the Vercel domain
- WHEN the browser loads the page
- THEN the `Content-Security-Policy` header MUST NOT allow `unsafe-inline` for `script-src`

#### Scenario: CSP allows Google Fonts

- GIVEN a page references fonts.googleapis.com
- WHEN the browser requests the font stylesheet
- THEN `style-src` MUST include `fonts.googleapis.com` AND `font-src` MUST include `fonts.gstatic.com`

### Requirement: SEC-HEADERS-002 — Frame protection

The site MUST serve `X-Frame-Options: DENY` to prevent clickjacking.

#### Scenario: Frame denial

- GIVEN any page of the site
- WHEN loaded in an `<iframe>` on another origin
- THEN the browser MUST refuse to render the page

### Requirement: SEC-HEADERS-003 — HTTPS transport

The site MUST serve `Strict-Transport-Security` with `max-age=31536000` and `includeSubDomains`.

#### Scenario: HSTS enforcement

- GIVEN the site is accessed over HTTPS
- WHEN the browser receives the HSTS header
- THEN the browser MUST enforce HTTPS for all subdomains for at least one year

### Requirement: SEC-HEADERS-004 — Header delivery

The security headers MUST be delivered via `public/_headers` using Vercel's static header syntax.

#### Scenario: File format

- GIVEN the deployment includes `public/_headers`
- WHEN Vercel processes the file
- THEN it MUST apply the declared headers to the matching URL patterns
