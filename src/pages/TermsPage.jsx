import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Gavel, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function TermsPage() {
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
                bgcolor: "grey", // Increase this number for a thicker line
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
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Gavel sx={{ fontSize: { xs: 28, sm: 36 } }} />
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
              TERMS OF SERVICE
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
            This website is operated by <strong>Gaurav Sahitya</strong>.
            Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo;
            and &ldquo;our&rdquo; refer to Job Notifier and Gaurav Sahitya. Job
            Notifier offers this website, including all information, tools, and
            services available from this site to you, the user, conditioned upon
            your acceptance of all terms, conditions, policies, and notices
            stated here.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 2 }}
          >
            By visiting our site and/or utilizing any notification, job listing,
            administrative utility, or alert feature from us, you engage in our
            &ldquo;Service&rdquo; and agree to be bound by the following terms
            and conditions (&ldquo;Terms of Service&rdquo;,
            &ldquo;Terms&rdquo;), including those additional terms and
            conditions and policies referenced herein and/or available by
            hyperlink. These Terms of Service apply to all users of the site,
            including without limitation users who are browsers, students,
            aspirants, job candidates, administrators, and/or contributors of
            content.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 2 }}
          >
            Please read these Terms of Service carefully before accessing or
            using our website. By accessing or using any part of the site, you
            agree to be bound by these Terms of Service. If you do not agree to
            all the terms and conditions of this agreement, then you may not
            access the website or use any services. If these Terms of Service
            are considered an offer, acceptance is expressly limited to these
            Terms of Service.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            Any new features, tools, or listing types which are added to the
            current portal shall also be subject to the Terms of Service. You
            can review the most current version of the Terms of Service at any
            time on this page. We reserve the right to update, change or replace
            any part of these Terms of Service by posting updates and/or changes
            to our website. It is your responsibility to check this page
            periodically for changes. Your continued use of or access to the
            website following the posting of any changes constitutes acceptance
            of those changes.
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
            SECTION 1 - ONLINE PORTAL TERMS
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            By agreeing to these Terms of Service, you represent that you are at
            least the age of majority in your state, union territory, or
            province of residence, or that you are the age of majority in your
            jurisdiction and you have given us your consent to allow any of your
            minor dependents to use this site.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            You may not use our platform, job listings, notices, or tools for
            any illegal or unauthorized purpose nor may you, in the use of the
            Service, violate any laws in your jurisdiction (including but not
            limited to intellectual property, copyright, and digital information
            technology laws).
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            You must not transmit any worms, trojans, viruses, or any code of a
            destructive or malicious nature. A breach or violation of any of the
            Terms will result in an immediate termination of your Services and
            account access.
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
            SECTION 2 - GENERAL CONDITIONS & INTELLECTUAL PROPERTY RIGHTS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We reserve the right to refuse service to anyone for any legitimate
            reason at any time.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            You understand that your non-confidential content may be transferred
            unencrypted and involve (a) transmissions over various networks; and
            (b) changes to conform and adapt to the technical requirements of
            connecting networks or devices. Sensitive account credentials and
            authenticated profile data are protected with industry-standard
            security safeguards.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>Copyright Protection &amp; Ownership:</strong> This entire
            website, including but not limited to its source code, architecture,
            software, user interface design, layout, graphics, branding, logos,
            database structures, content, notifications, alerts, and all related
            services (collectively, the &ldquo;Platform &amp; Services&rdquo;),
            are the exclusive intellectual property of{" "}
            <strong>Gaurav Sahitya</strong> (Coding Works / Job Notifier) and
            are protected under the <strong>Copyright Act, 1957</strong> (as
            amended from time to time) and applicable international copyright
            and intellectual property laws. All rights not expressly granted
            herein are strictly reserved.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>Scope of User Permission (Limited License):</strong> Users
            are granted solely a limited, revocable, non-exclusive,
            non-transferable, and personal permission to access, view, and use
            this website and its related services strictly for their own
            individual, non-commercial informational purposes (such as
            discovering, tracking, and applying for employment opportunities and
            recruitment updates).
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>
              Strict Prohibition on Sale, Copying, and Distribution:
            </strong>{" "}
            Under no circumstances does any user possess any right, license,
            title, or permission to sell, resell, copy, duplicate, clone,
            reproduce, distribute, redistribute, syndicate, broadcast, license,
            sublicense, rent, lease, modify, translate, create derivative works
            from, reverse engineer, decompile, or otherwise commercially exploit
            any portion of this website, its source code, or any of its related
            services, in any form or by any means whatsoever, without the
            express prior written consent of Gaurav Sahitya. Any unauthorized
            copying, sale, distribution, or commercial exploitation is a direct
            violation of the Copyright Act and will lead to immediate revocation
            of access and strict civil and criminal legal action under
            applicable laws.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            The headings used in this agreement are included for convenience
            only and will not limit or otherwise affect these Terms.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 3 */}
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
            SECTION 3 - ACCURACY, COMPLETENESS, AND TIMELINESS OF INFORMATION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We are not responsible if information made available on this site is
            not accurate, complete, or current. The material on this site is
            provided for general informational purposes only and should not be
            relied upon or used as the sole basis for making recruitment,
            career, or legal decisions without consulting primary, more
            accurate, more complete, or more timely sources of information (such
            as official government gazettes, statutory recruitment commission
            advertisements, and recruiting authority portals). Any reliance on
            the material on this site is entirely at your own risk.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            This site may contain certain historical recruitment information,
            expired notifications, or past examination notices. Historical
            information, necessarily, is not current and is provided for your
            reference and archival purposes only. We reserve the right to modify
            the contents of this site at any time, but we have no obligation to
            update any information on our site. You agree that it is your
            responsibility to monitor changes to our site.
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
            SECTION 4 - MODIFICATIONS TO THE SERVICE
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            Services, features, categories, notification channels, and
            operational utilities provided on Job Notifier are subject to change
            without notice.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We reserve the right at any time to modify or discontinue the
            Service (or any part or content thereof) without notice at any time.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            We shall not be liable to you or to any third party for any
            modification, suspension, or discontinuance of the Service.
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
            SECTION 5 - SERVICES AND JOB NOTIFICATIONS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            Job Notifier acts as an informational aggregator and notification
            disseminator for government recruitments (Sarkari Naukri),
            competitive exam notifications, admit cards, answer keys, results,
            and private sector hiring drives. We are not an employer, recruiting
            authority, or placement agency.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We reserve the right, but are not obligated, to limit the provision
            of our Services or notifications to any person, geographic region,
            or jurisdiction. We may exercise this right on a case-by-case basis.
            All descriptions of notifications, eligibility criteria, vacancies,
            or application deadlines are subject to change at any time without
            notice, at our sole discretion or in alignment with recruiting
            bodies.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            We do not warrant that the quality of any services, information, or
            other material obtained by you will meet your individual
            expectations, or that any errors in the Service will be immediately
            corrected.
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
            SECTION 6 - ACCURACY OF ACCOUNT AND REGISTRATION INFORMATION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We reserve the right to refuse or cancel any account registration
            submitted to us. We may, in our sole discretion, limit or cancel
            accounts per person or per device. In the event that we make a
            change to or cancel an account, we may attempt to notify you by
            contacting the email and/or mobile number provided at the time the
            account was created.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            You agree to provide current, complete, and accurate registration
            and profile information for all accounts created on our portal. You
            agree to promptly update your account and other information,
            including your email address and profile details, so that we can
            maintain your account security and contact you as needed.
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
            SECTION 7 - THIRD-PARTY LINKS & EXTERNAL RECRUITMENT SITES
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            Certain content, tools, and services available via our Service
            include materials and hyperlinks from third parties.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5, fontStyle: "italic" }}
          >
            <strong>
              External links provided anywhere in the portal is to make student/
              aspirants/ candidates/ and other related peoples eligibile to
              directly head over to the desired web location and apply for the
              job opportunity, so users are advised to kindly share their
              personal data on such external sites at their own risk, as job
              notifier shall not bear any type consequences if any kind of fraud
              happens with the users.
            </strong>
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            Third-party links on this site may direct you to third-party
            websites (such as official commission portals, government recruiting
            agencies, corporate recruitment dashboards, or payment gateways)
            that are not affiliated with us. We are not responsible for
            examining or evaluating the content or accuracy and we do not
            warrant and will not have any liability or responsibility for any
            third-party materials or websites, or for any other materials,
            products, or services of third parties.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            We are not liable for any harm or damages related to the purchase or
            use of goods, services, resources, content, exam application fee
            payments, or any other transactions made in connection with any
            third-party websites. Please review carefully the third
            party&rsquo;s policies and practices and make sure you understand
            them before you engage in any transaction. Complaints, claims,
            concerns, or questions regarding third-party products should be
            directed to the third party.
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
            SECTION 8 - OPTIONAL TOOLS & THIRD-PARTY CHANNELS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We may provide you with access to third-party tools, social
            broadcast channels (such as WhatsApp Community Channels and Telegram
            Channels), and document readers over which we neither monitor nor
            have any control nor input.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            You acknowledge and agree that we provide access to such tools
            &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any
            warranties, representations, or conditions of any kind and without
            any endorsement. We shall have no liability whatsoever arising from
            or relating to your use of optional third-party tools or channels.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 9 */}
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
            SECTION 9 - USER COMMENTS, FEEDBACK, AND OTHER SUBMISSIONS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            If, at our request, you send certain specific submissions or without
            a request from us you send suggestions, feedback, ideas, or other
            materials (collectively, &lsquo;comments&rsquo;), you agree that we
            may, at any time, without restriction, edit, copy, publish,
            distribute, and otherwise use in any medium any comments that you
            forward to us. We are and shall be under no obligation <br />
            <strong>(1)</strong> to maintain any comments in confidence; <br />
            <strong>(2)</strong> to pay compensation for any comments; or <br />
            <strong>(3)</strong> to respond to any comments.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            You agree that your comments will not violate any right of any third
            party, including copyright, trademark, privacy, personality, or
            other personal or proprietary right. You further agree that your
            submissions will not contain libelous or otherwise unlawful,
            abusive, or obscene material, or contain any computer virus or other
            malware that could in any way affect the operation of the Service.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            We reserve the right, though we are not obligated, to review,
            modify, or delete materials that we judge, at our exclusive
            discretion, to be illegal, hostile, intimidating, slanderous,
            defamatory, explicit, vulgar, or otherwise unacceptable, or that
            infringe upon any party's intellectual property or these Terms of
            Service.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            You consent that your submissions will not infringe upon the rights
            of any outside party, encompassing copyright, trademark, privacy,
            personality, or other personal and proprietary privileges. You
            additionally consent that your remarks will be free of slanderous or
            otherwise illegal, hostile, or vulgar content, and will not carry
            any computer viruses or harmful software that might impair the
            functionality of the Service or any associated website. You are
            prohibited from utilizing a fabricated email address, impersonating
            another individual, or otherwise deceiving us or outside parties
            regarding the source of any submissions. You bear sole
            responsibility for all remarks you produce and their factual
            correctness. We accept no accountability and bear no legal liability
            for any submissions published by you or any outside party.
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
            SECTION 10 - PERSONAL INFORMATION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            Your submission of personal information through the portal is
            governed by our Privacy Policy. Please view our Privacy Policy for
            details regarding our data collection, security standards, and user
            privacy protections.
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
            SECTION 11 - ERRORS, INACCURACIES, AND OMISSIONS
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            Occasionally there may be information on our site or in the Service
            that contains typographical errors, inaccuracies, or omissions that
            may relate to job titles, vacancy numbers, application fees,
            qualification requirements, examination dates, or official
            notification URLs.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            We reserve the right to correct any errors, inaccuracies, or
            omissions, and to change or update information if any information in
            the Service or on any related website is inaccurate at any time
            without prior notice.
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
            SECTION 12 - PROHIBITED USES
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            In addition to other prohibitions as set forth in the Terms of
            Service, you are prohibited from using the site or its content:
            <br />
            <strong>(a)</strong> for any unlawful purpose;
            <br />
            <strong>(b)</strong> to solicit others to perform or participate in
            any unlawful acts;
            <br />
            <strong>(c)</strong> to violate any international, federal,
            provincial, or state regulations, rules, laws, or local ordinances;
            <br />
            <strong>(d)</strong> to infringe upon or violate our intellectual
            property rights under the Copyright Act or the intellectual property
            rights of others (including unauthorized copying, distribution,
            syndication, reproduction, or sale of any portal content, software,
            or related services);
            <br />
            <strong>(e)</strong> to harass, abuse, insult, harm, defame,
            slander, disparage, intimidate, or discriminate based on gender,
            sexual orientation, religion, ethnicity, race, age, national origin,
            or disability;
            <br />
            <strong>(f)</strong> to submit false or misleading information;
            <br />
            <strong>(g)</strong> to upload or transmit viruses or any other type
            of malicious code that will or may be used in any way that will
            affect the functionality or operation of the Service or of any
            related website, other websites, or the Internet;
            <br />
            <strong>(h)</strong> to collect or track the personal information of
            others;
            <br />
            <strong>(i)</strong> to spam, phish, pharm, pretext, spider, crawl,
            or scrape;
            <br />
            <strong>(j)</strong> for any obscene or immoral purpose; or
            <br />
            <strong>(k)</strong> to interfere with or circumvent the security
            features of the Service or any related website, other websites, or
            the Internet.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            We reserve the right to terminate your use of the Service or any
            related website for violating any of the prohibited uses and a legal
            action may be taken against user(s) who found commiting any such
            actions.
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
            SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            We do not guarantee, represent, or warrant that your use of our
            service will be uninterrupted, timely, secure, or error-free. We do
            not warrant that the results that may be obtained from the use of
            the service will be accurate or reliable.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            You agree that from time to time we may remove the service for
            indefinite periods of time or cancel the service at any time,
            without notice to you. You expressly agree that your use of, or
            inability to use, the service is at your sole risk.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            In no case shall Job Notifier, Coding Works, Gaurav Sahitya, our
            directors, officers, employees, affiliates, agents, contractors,
            interns, suppliers, or service providers be liable for any injury,
            loss, claim, or any direct, indirect, incidental, punitive, special,
            or consequential damages of any kind, including, without limitation
            lost profits, lost revenue, lost savings, loss of data, replacement
            costs, or any similar damages, whether based in contract, tort
            (including negligence), strict liability, or otherwise, arising from
            your use of any of the service or any products procured using the
            service, or for any other claim related in any way to your use of
            the service.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 14 */}
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
            SECTION 14 - INDEMNIFICATION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            You agree to indemnify, defend, and hold harmless Job Notifier,
            Coding Works, Gaurav Sahitya, and our parent, subsidiaries,
            affiliates, partners, officers, directors, agents, contractors,
            licensors, service providers, subcontractors, suppliers, interns,
            and employees, harmless from any claim or demand, including
            reasonable attorneys&rsquo; fees, made by any third party due to or
            arising out of your breach of these Terms of Service or the
            documents they incorporate by reference, or your violation of any
            law or the rights of a third party.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 15 */}
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
            SECTION 15 - SEVERABILITY
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            In the event that any provision of these Terms of Service is
            determined to be unlawful, void, or unenforceable, such provision
            shall nonetheless be enforceable to the fullest extent permitted by
            applicable law, and the unenforceable portion shall be deemed to be
            severed from these Terms of Service; such determination shall not
            affect the validity and enforceability of any other remaining
            provisions.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 16 */}
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
            SECTION 16 - TERMINATION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            The obligations and liabilities of the parties incurred prior to the
            termination date shall survive the termination of this agreement for
            all purposes.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            These Terms of Service are effective unless and until terminated by
            either you or us. You may terminate these Terms of Service at any
            time by notifying us that you no longer wish to use our Services, or
            when you cease using our site. If in our sole judgment you fail, or
            we suspect that you have failed, to comply with any term or
            provision of these Terms of Service, we also may terminate this
            agreement at any time without notice and you will remain liable for
            all amounts due up to and including the date of termination; and/or
            accordingly may deny you access to our Services (or any part
            thereof).
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 17 */}
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
            SECTION 17 - ENTIRE AGREEMENT
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            The failure of us to exercise or enforce any right or provision of
            these Terms of Service shall not constitute a waiver of such right
            or provision.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            These Terms of Service and any policies or operating rules posted by
            us on this site or in respect to The Service constitutes the entire
            agreement and understanding between you and us and govern your use
            of the Service, superseding any prior or contemporaneous agreements,
            communications, and proposals, whether oral or written, between you
            and us (including, but not limited to, any prior versions of the
            Terms of Service). Any ambiguities in the interpretation of these
            Terms of Service shall not be construed against the drafting party.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 18 */}
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
            SECTION 18 - GOVERNING LAW AND JURISDICTION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            These Terms of Service and any separate agreements whereby we
            provide you Services shall be governed by and construed in
            accordance with the laws of the Republic of India, and subject to
            the exclusive jurisdiction of the competent courts in India.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 19 */}
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
            SECTION 19 - RETROSPECTIVE APPLICABILITY & CHANGES TO TERMS OF
            SERVICE
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8, mb: 1.5 }}
          >
            <strong>Retrospective Application:</strong> These terms are being
            applied to all users retrospectively. Regardless of the date of your
            initial account registration, portal access, or previous
            interactions, your past, current, and future use of Job Notifier
            confirms your unconditional acceptance of these terms with
            retrospective effect from your earliest interaction with the
            platform.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            You can review the most current version of the Terms of Service at
            any time at this page. We reserve the right, at our sole discretion,
            to update, change, or replace any part of these Terms of Service by
            posting updates and changes to our website. It is your
            responsibility to check our website periodically for changes. Your
            continued use of or access to our website or the Service following
            the posting of any changes to these Terms of Service constitutes
            acceptance of those changes.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* SECTION 20 */}
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
            SECTION 20 - CONTACT INFORMATION
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            Questions about the Terms of Service should be sent to us through
            our official support and contact channels available on the portal.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default React.memo(TermsPage);
