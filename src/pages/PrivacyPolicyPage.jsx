import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Security, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NavbarLogo from "../components/core/NavbarLogo";

/**
 * Privacy Policy Page
 *
 * Modeled after comprehensive data protection frameworks (such as NamasteDev),
 * adapted specifically for Job Notifier's multi-tier employment aggregation portal
 * (covering Government Jobs, PSUs, Private Corporate Careers, Small Startup Roles, and Internships),
 * with broad coverage of external links (from statutory portals to direct WhatsApp URIs),
 * retrospective application, zero tech stack jargon, direct email grievance redressal, and GDPR compliance.
 */
function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ my: { xs: 2, sm: 4 } }}>
      <Button
        variant="text"
        startIcon={<ArrowBack fontSize="small" />}
        onClick={() => navigate("/")}
        sx={{ mb: 2, textTransform: "none", fontWeight: 600 }}
        size="small"
      >
        Back
      </Button>

      <Paper
        variant="elevation"
        elevation={3}
        sx={{
          p: { xs: 2.5, sm: 4, md: 5 },
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "center", mb: 2 }}>
          <Divider
            sx={{
              flexGrow: 1,
              "&::before, &::after": {
                borderTopWidth: 4,
                bgcolor: "grey",
              },
            }}
          >
            <NavbarLogo src="/logo.png" height={128} hidePadding hideTooltip />
          </Divider>
        </Stack>

        {/* Header */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
          <Box
            sx={{
              p: 1.2,
              borderRadius: "50%",
              color: "success.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Security sx={{ fontSize: { xs: 28, sm: 36 } }} />
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              PRIVACY POLICY
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              Last Updated: October 2026
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2.5 }} />

        {/* Overview introductory text */}
        <Box sx={{ mb: 3, textAlign: "justify" }}>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, mb: 2, fontWeight: 500 }}
          >
            This website is operated by <strong>Gaurav Sahitya</strong> (a
            product of <strong>Coding Works</strong> /{" "}
            <strong>Job Notifier</strong>). Throughout this Privacy Policy, the
            terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer
            to Job Notifier, Coding Works, and Gaurav Sahitya. We are deeply
            committed to respecting your privacy, maintaining data integrity,
            and being transparent regarding how your information is handled
            across our portal and related notification services.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 2 }}
          >
            This Privacy Policy governs the manner in which Job Notifier
            collects, maintains, uses, protects, and discloses information
            collected from users (including &ldquo;Students&rdquo;,
            &ldquo;Aspirants&rdquo;, &ldquo;Job Seekers&rdquo;,
            &ldquo;Interns&rdquo;, &ldquo;Candidates&rdquo;,
            &ldquo;Administrators&rdquo;, &ldquo;You&rdquo; or
            &ldquo;Users&rdquo;) of this website and all associated alert feeds,
            notification channels, and administrative utilities. Job Notifier
            aggregates, curates, and disseminates career alerts spanning{" "}
            <strong>
              Central &amp; State Government jobs (Sarkari Naukri), Public
              Sector Undertakings (PSUs), Statutory Recruiting Commissions,
              Banking and Financial Institutions, Private Sector Corporate
              Recruitments, Startup Opportunities from Emerging and Small Firms,
              and Student Internships/Apprenticeships.
            </strong>{" "}
            By visiting our portal, creating an account, or utilizing any of our
            features, you acknowledge and agree to the data practices and terms
            outlined in this policy.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            Our core operating principle is minimal data collection: we collect
            only such information as is strictly necessary to provide users with
            a smooth experience, maintain platform security, and deliver
            required website features.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 1 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 1 - SCOPE, ACCEPTANCE, AND RETROSPECTIVE APPLICABILITY
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            This Privacy Policy applies universally to all visitors, registered
            candidates, job aspirants, interns, and administrators who access,
            browse, or interact with Job Notifier. By accessing or using our
            portal, you unconditionally signify your consent to the terms of
            this Privacy Policy. If you do not agree with this policy in its
            entirety, you must discontinue the use of our website and services
            immediately.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>Retrospective Applicability:</strong> Please be explicitly
            informed that this Privacy Policy is applied to all users{" "}
            <strong>retrospectively</strong>. This policy governs all personal
            information, account profiles, session data, operational records,
            and interactions previously collected, currently stored, or
            collected in the future, with full legal effect extending back to
            the moment of your very earliest access or interaction with the Job
            Notifier portal.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 2 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 2 - INFORMATION WE COLLECT (LIMITED TO SMOOTH USER
            EXPERIENCE)
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We collect personal identification information from users only when
            voluntarily submitted, strictly to provide users with a smooth
            experience, deliver required website features, manage user accounts,
            and ensure the authentic functioning of the platform.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>1. Voluntary Account & Profile Information:</strong> When
            you register on our portal, update your account, or customize your
            preferences, we may collect basic details including your name, email
            address, contact number, optional display picture, and notification
            preferences. Users always have the option to refuse to supply
            personal identification details, with the understanding that it may
            prevent them from engaging in certain account-dependent portal
            features (such as saving alerts or bookmarking jobs).
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>
              2. Non-Personal Identification & Operational Information:
            </strong>{" "}
            Whenever you interact with our website, we may collect non-personal
            identification information to maintain platform performance and
            navigation efficiency. This non-personal information may include
            browser category, operating system environment, preferred language,
            general regional indicators, session authentication state, and
            technical diagnostic indicators necessary to route and deliver job
            notices seamlessly.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>3. Security Verification Credentials:</strong> To safeguard
            the portal against automated spam, credential stuffing, and
            unauthorized administrative actions, we may collect transient
            verification tokens and security responses (such as CAPTCHA
            challenges during sensitive operations) strictly to authenticate
            real human interactions and protect our community.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 3 - EXPANDED OPPORTUNITIES & EXTERNAL DESTINATIONS */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 3 - DIVERSITY OF OPPORTUNITIES, EXTERNAL APPLICATION
            DESTINATIONS & DIRECT CHANNELS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            Job Notifier functions as an expansive informational and
            notification aggregator. While our core foundation originated in
            aggregating{" "}
            <strong>Government Job Opportunities (Sarkari Naukri)</strong>,
            Public Sector Undertakings (PSUs), and Statutory Commission
            recruitments, our portal also actively curates and lists
            opportunities across the entire spectrum of employment, including{" "}
            <strong>
              Private Corporate Jobs, Opportunities from Small and Early-Stage
              Startups, Boutique Firms, and Student Internship / Apprenticeship
              Programs.
            </strong>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>
              1. Diverse Nature of External Links &amp; Destination URIs:
            </strong>
            <br />
            External links provided on Job Notifier are{" "}
            <strong>not limited</strong> to institutional hiring portals or
            statutory government commission websites. Depending on the nature of
            the hiring organization, external links and destination URIs may
            encompass <em>any valid web or messaging endpoint</em>, including
            but not limited to:
            <br />• <em>Statutory Government Portals:</em> Official state and
            central commission portals (e.g., UPSC, SSC, State PSCs, Railway
            Recruitment Boards, NTA, High Courts, and Defense recruiting
            portals).
            <br />• <em>Corporate Career Portals &amp; ATS:</em> Enterprise
            recruitment dashboards, corporate careers portals, and applicant
            tracking systems (such as Workday, Greenhouse, Lever, and company
            portals).
            <br />• <em>Startup &amp; Small Firm Career Pages:</em> Company
            landing pages, niche startup hiring boards, and official direct
            recruiter listings.
            <br />• <em>
              Third-Party Application Forms &amp; Questionnaires:
            </em>{" "}
            Dedicated online application questionnaires, such as Google Forms,
            Microsoft Forms, Typeforms, or custom recruiter intake sheets.
            <br />• <em>Direct Communication &amp; Chat URIs:</em>{" "}
            <strong>
              Valid WhatsApp number URIs (e.g., direct chat links such as
              &ldquo;https://wa.me/...&rdquo; or WhatsApp business links),
              Telegram broadcast and discussion channels, direct recruiter email
              (&ldquo;mailto:&rdquo;) hyperlinks, and recruiter telephone
              numbers
            </strong>
            , which are frequently employed by startups, small firms, boutique
            consultancies, and independent recruiters to receive resumes and
            interact directly with applicants.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>
              2. Independent Informational Role &amp; Non-Collection of
              Candidate Dossiers:
            </strong>
            <br />
            Job Notifier is strictly an informational and notification medium.
            We are neither an employer, a recruiting agency, an examination
            authority, nor a contracting partner of any listed hiring
            organization.{" "}
            <strong>
              Job Notifier does NOT collect, screen, or store candidates&rsquo;
              official application dossiers, resumes, curriculum vitae, academic
              certificates, reservation/caste documents, domicile certificates,
              government identity numbers (such as Aadhaar, PAN, Voter ID, or
              Passport), examination fee payments, or financial credentials.
            </strong>{" "}
            All job applications, resume transmissions, and candidate
            communications take place directly and exclusively between the
            applicant and the external organization or recruiter.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>
              3. Heightened User Caution for Private, Startup &amp; Direct Chat
              Channels:
            </strong>
            <br />
            While official government portals maintain statutory security
            frameworks, links leading to private companies, emerging startups,
            third-party application forms, or{" "}
            <strong>
              direct messaging channels like WhatsApp and direct email
            </strong>{" "}
            possess varying degrees of verification and operational formality.
            Users are strongly urged to exercise their own thorough diligence,
            discretion, and scrutiny before sharing any personal resume, phone
            number, residential address, or academic history over external sites
            or direct chat links.
            <br />
            <br />
            <strong>FRAUD WARNING:</strong> Genuine employers and government
            bodies will never ask candidates to transfer money, security
            deposits, laptop fees, or examination processing charges via
            personal UPI IDs, cryptocurrency, or gift cards during recruitment
            or internship screening. Sharing data or initiating conversations
            through external URIs (including WhatsApp links) is undertaken
            entirely at your own risk, as Job Notifier accepts zero legal
            responsibility or liability for any scam, impersonation, fraud, or
            misuse of personal data arising from third-party interactions.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 4 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 4 - PURPOSE AND LEGAL BASIS FOR DATA PROCESSING
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We collect and process your information exclusively under lawful,
            transparent, and defined grounds to provide users with a smooth
            experience and enable required website features. Our legal bases
            include:
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>(a) Performance of Service &amp; Required Features:</strong>{" "}
            To authenticate your login sessions, maintain your active profile,
            remember your bookmarked job notices, manage notification
            preferences, and allow you to navigate the portal without
            interruption.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>(b) Legitimate Interests:</strong> To ensure the operational
            stability and cyber security of our portal, detect and neutralize
            fraudulent or abusive activities, optimize layout and notification
            delivery, monitor system health, and provide aspirants and
            candidates with timely employment notices across both public and
            private sectors.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>(c) Consent:</strong> Where you have expressly provided
            consent, such as opting in to receive customized job alert
            notifications or uploading an optional profile picture.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>(d) Legal Compliance:</strong> To comply with applicable
            statutory requirements, governmental directives, court orders, or
            lawful requests under data protection and digital information
            legislation.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 5 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 5 - WEB BROWSER COOKIES &amp; LOCAL SESSION IDENTIFIERS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            Our portal may utilize standard &ldquo;cookies&rdquo; and local
            session storage identifiers to enrich and streamline user
            experience. A cookie is a modest data file placed on your device for
            record-keeping and session maintenance.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We use these local session identifiers strictly for functional
            purposes: keeping you securely signed in across browsing sessions,
            preserving your display and notification preferences, remembering
            filters applied to job categories (such as government, private,
            startup, or internship tags), and ensuring smooth navigation
            throughout the portal.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            You have the autonomy to configure your web browser to decline
            cookies or to alert you when cookies are being transmitted. However,
            please note that if you disable cookies or local session storage,
            certain authenticated segments and interactive features of the
            portal may not function with optimal efficiency.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 6 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 6 - THIRD-PARTY LINKS &amp; EXTERNAL DESTINATION ENDPOINTS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            The fundamental function of Job Notifier is to aggregate and present
            job notifications, official circulars, exam schedules, and direct
            links to external destinations—including government gateways,
            corporate ATS platforms, startup hiring pages, external
            Google/Typeform questionnaires, and direct messaging channels such
            as valid WhatsApp URIs and recruiter contact links.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>Independent Privacy Policies:</strong> Once you click on an
            external link or messaging URI and exit the Job Notifier domain,
            this Privacy Policy ceases to govern. Third-party websites, external
            form providers, and messaging platforms operate under entirely
            separate, autonomous privacy statements, security protocols, and
            terms of service. We do not monitor, control, endorse, or accept
            legal liability for the content, security measures, or data
            practices of any external sites or communication channels.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>Mandatory Risk Acknowledgment:</strong> External links
            provided anywhere in the portal are to enable students, aspirants,
            and candidates to directly navigate to desired destinations and
            apply for opportunities. Users are strongly advised to exercise
            diligence and share their personal, academic, or financial data on
            external sites and direct chat channels at their own risk, as Job
            Notifier bears no responsibility or liability if any fraud, loss, or
            unauthorized data usage occurs on external platforms.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 7 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 7 - DATA SECURITY, ENCRYPTION AT REST, AND SAFEGUARDS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We implement comprehensive organizational, physical, and electronic
            security safeguards to protect user information against unauthorized
            access, alteration, disclosure, accidental loss, or destruction.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>• Encryption at Rest and in Transit:</strong> Sensitive
            account records, authentication credentials, and user profile media
            are stored securely using robust, modern encryption standards to
            ensure that stored information remains protected against
            unauthorized inspection. Data transferred between your browser and
            our servers is protected using encrypted communication channels.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>• Access Control &amp; Confidentiality:</strong> Access to
            user data is strictly restricted to authorized administrative
            personnel on a need-to-know basis. All personnel with system access
            are bound by strict contractual confidentiality obligations. While
            we implement industry-standard electronic and managerial defenses,
            users acknowledge that no transmission across the internet or
            digital storage system can be guaranteed to be 100% impenetrable.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 8 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 8 - DATA RETENTION AND DELETION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We retain your personal information only for as long as is necessary
            to provide you with a smooth user experience, fulfill the
            operational features of the portal, maintain your account profile,
            or satisfy applicable legal, accounting, or security requirements.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            When an account is deactivated or when a user requests the deletion
            of their personal records, we will securely delete, anonymize, or
            remove identifiable data from our active systems, except where
            retention is mandated by law, necessary for legitimate fraud
            prevention, or required to enforce our legal agreements.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 9 - IN-DEPTH GDPR SECTION */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 9 - SPECIAL PROVISIONS UNDER THE GENERAL DATA PROTECTION
            REGULATION (GDPR)
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            This section provides a dedicated analysis and set of disclosures
            for individuals located in the <strong>European Union (EU)</strong>,
            the <strong>European Economic Area (EEA)</strong>, and the{" "}
            <strong>United Kingdom (UK)</strong>, in accordance with the EU and
            UK <strong>General Data Protection Regulation (GDPR)</strong>.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>1. Identification of the Data Controller:</strong>
            <br />
            For the purpose of the GDPR, the Data Controller responsible for the
            personal data processed through Job Notifier is:
            <br />
            <strong>Gaurav Sahitya</strong> (Founder &amp; Lead Architect,
            Coding Works / Job Notifier), operating from India.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>
              2. Application to Job Notifier&rsquo;s Multi-Sector Recruitment
              &amp; Opportunity Portal:
            </strong>
            <br />
            Job Notifier is an India-centric informational aggregator that
            curates notifications spanning Indian public sector recruitments,
            civil services examinations, defense drives, private corporate
            hiring, startup positions, and internships. While our primary focus
            is the Indian employment and educational ecosystem, Non-Resident
            Indians (NRIs), Overseas Citizens of India (OCIs), and candidates
            residing in the EU, EEA, or UK may utilize our platform to track
            examination announcements, corporate vacancies, or internship
            drives. For any such international users, we strictly honor the data
            protection principles and fundamental rights guaranteed under the
            GDPR.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>
              3. Comprehensive Enumeration of Your Rights under the GDPR:
            </strong>
            <br />
            If you are located in the EU, EEA, or UK, you are endowed with
            specific statutory rights regarding your personal data:
            <br />• <strong>Right of Access (Article 15 GDPR):</strong> You have
            the right to request confirmation as to whether your personal data
            is being processed, and where that is the case, access to the
            personal data and detailed information regarding the purposes and
            categories of processing.
            <br />• <strong>
              Right to Rectification (Article 16 GDPR):
            </strong>{" "}
            You have the right to obtain the prompt rectification of inaccurate
            personal data concerning you, and to have incomplete personal data
            completed through your account settings or by contacting us.
            <br />•{" "}
            <strong>
              Right to Erasure / &ldquo;Right to be Forgotten&rdquo; (Article 17
              GDPR):
            </strong>{" "}
            You have the right to request the complete deletion of your personal
            data when it is no longer necessary for the purposes for which it
            was collected, or when you withdraw your consent and no other legal
            ground for processing exists.
            <br />•{" "}
            <strong>
              Right to Restriction of Processing (Article 18 GDPR):
            </strong>{" "}
            You have the right to restrict the processing of your personal data
            where you contest the accuracy of the data, the processing is
            unlawful, or we no longer require the data but you need it for legal
            claims.
            <br />•{" "}
            <strong>Right to Data Portability (Article 20 GDPR):</strong> You
            have the right to receive the personal data concerning you, which
            you provided to us, in a structured, commonly used, and
            machine-readable format, and to transmit that data to another
            controller without hindrance.
            <br />• <strong>Right to Object (Article 21 GDPR):</strong> You have
            the right to object, on grounds relating to your particular
            situation, at any time to the processing of your personal data based
            on our legitimate interests. We will cease processing unless we
            demonstrate compelling legitimate grounds which override your
            interests, rights, and freedoms.
            <br />•{" "}
            <strong>Right to Withdraw Consent (Article 7(3) GDPR):</strong>{" "}
            Where processing is predicated on your explicit consent (such as
            alert subscriptions or profile photos), you retain the absolute
            right to withdraw your consent at any time. The withdrawal of
            consent does not affect the lawfulness of processing based on
            consent prior to its withdrawal.
            <br />•{" "}
            <strong>
              Freedom from Automated Individual Decision-Making &amp; Profiling
              (Article 22 GDPR):
            </strong>{" "}
            Job Notifier does <em>not</em> conduct automated profiling,
            algorithmic filtering, or automated employment selection. All hiring
            decisions, eligibility assessments, interview shortlisting, and
            admissions are conducted independently by external employers,
            startups, or recruiting commissions on their respective platforms.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>
              4. International Cross-Border Data Transfers (Chapter V GDPR):
            </strong>
            <br />
            Job Notifier is hosted and operated from servers located within the
            Republic of India. If you access our platform from the EU, EEA, or
            UK, your personal data (such as account credentials and notification
            preferences) will be transferred to, stored, and processed in India.
            By creating an account or continuing to use the portal, you
            explicitly acknowledge and consent to this international transfer
            under{" "}
            <strong>Article 49(1)(a) and Article 49(1)(b) of the GDPR</strong>,
            as the transfer is necessary for the performance of the
            informational services and website features you have requested.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>5. How to Exercise Your GDPR Rights:</strong>
            <br />
            Users wishing to exercise any of their statutory rights under the
            GDPR may submit their request directly via email to{" "}
            <Link
              href="mailto:works.sahitya@gmail.com"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              works.sahitya@gmail.com
            </Link>
            . We will respond to verified requests within thirty (30) days in
            compliance with statutory GDPR timelines, free of charge, unless the
            request is manifestly unfounded or excessive.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 10 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 10 - SHARING AND DISCLOSURE OF INFORMATION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>Strict Non-Sale Commitment:</strong> We{" "}
            <strong>do not sell, trade, rent, or lease</strong> your personal
            identification information to commercial third parties, advertising
            brokers, or unauthorized outside entities under any circumstances.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We may share generic aggregated demographic information not linked
            to any personal identification information with trusted analytical
            utilities solely to understand portal traffic patterns and improve
            usability.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>Lawful Disclosures:</strong> We may disclose personal
            information solely when required by law, such as to comply with a
            valid court order, governmental inquiry, subpoena, or statutory
            regulation, or when we determine in good faith that disclosure is
            necessary to protect our legal rights, investigate fraud, enforce
            our Terms of Service, or ensure the safety of our users and the
            public.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 11 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 11 - MINORS AND AGE OF CONSENT
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            Protecting the privacy of minors is especially vital. Job Notifier
            is intended for candidates who have attained the age of majority in
            their jurisdiction (typically 18 years of age or older in India) or
            students who are navigating career notifications and student
            internships under the consent and supervision of a parent or legal
            guardian. We do not knowingly solicit or collect personally
            identifiable information from children under the age of 16. If we
            become aware that we have inadvertently collected personal data from
            a minor without verifiable parental consent, we will take immediate
            measures to remove such information from our records.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 12 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 12 - INTELLECTUAL PROPERTY &amp; PROHIBITION ON DATA
            HARVESTING
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            All compilations, categorization models, summaries, notifications,
            and architectural databases published on Job Notifier are
            proprietary works protected under the{" "}
            <strong>Copyright Act, 1957</strong> and relevant intellectual
            property legislation. Users are granted permission to access the
            portal solely for individual, non-commercial use. Automated
            scraping, data harvesting, systematic extraction, bulk harvesting of
            user directories, or unauthorized mirroring of our notification
            feeds is strictly prohibited and constitutes actionable intellectual
            property infringement.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 13 */}
        <Box sx={{ mb: 2, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 13 - POLICY UPDATES &amp; RETROSPECTIVE EFFECT
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            Job Notifier reserves the right, at its sole discretion, to modify,
            update, or replace any portion of this Privacy Policy at any time to
            reflect enhancements to our services, changes in regulatory
            frameworks, or evolving legal standards.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            When changes are posted, the updated revision date at the top of
            this page will be amended. Any modifications or revisions shall take
            effect immediately upon publication and shall apply{" "}
            <strong>retrospectively</strong> to all user accounts, records, and
            data held by the portal from inception. We encourage users to
            frequently inspect this page to stay apprised of how we are
            safeguarding the personal information we collect.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 14 */}
        <Box sx={{ mb: 1, textAlign: "justify" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              mb: 1.5,
              color: "text.primary",
            }}
          >
            SECTION 14 - GRIEVANCE REDRESSAL &amp; CONTACT INFORMATION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            For all grievances, privacy concerns, data subject requests, or
            questions regarding this Privacy Policy and portal services, users
            can directly contact us via email. All grievance redressal
            communications and inquiries should be sent via email to{" "}
            <Link
              href="mailto:works.sahitya@gmail.com"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              works.sahitya@gmail.com
            </Link>
            .
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default React.memo(PrivacyPolicyPage);
