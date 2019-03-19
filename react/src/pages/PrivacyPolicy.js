import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Backend } from "../services/Backend";

var dateFormat = require("dateformat");

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  bgColor: {
    backgroundColor: "#ececec"
  },
  tab: {
    fontWeight: 700
  },
  tabWrapper: {
    width: "100%",
    paddingBottom: 50
  },
  title: {
    fontWeight: 300,
    marginTop: 40,
    marginBottom: 0,
    textAlign: "left",
    paddingLeft: 25
  }
});

class PrivacyPolicy extends React.Component {
  state = {
    redirect: null
  };

  renderContent() {
    return (
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          fontSize: 12,
          textAlign: "justify"
        }}
      >
        <br />
        <br />
        <b
          style={{
            fontSize: 14
          }}
        >
          Privacy Policy
        </b>
        <br />
        <br />
        Effective Date: February 28, 2019.
        <br />
        <br />
        <br />
        <b>OUR COMMITMENT</b>
        <br />
        <br />
        Nomitime.com (“NomiTime”), which is operated by NIU TECH SDN BHD
        (“Company”), respects your privacy. We are committed to protecting the
        privacy of our users and we want to provide a safe and secure user
        experience. We will use our best efforts to ensure that the information
        you submit to us remains private and is used only for the purposes set
        forth herein. This policy details how data about you is collected, used,
        and shared when you access our websites and services or interact with us
        (collectively, the “NomiTime Services”).
        <br />
        <br />
        <br />
        <b>APPLICABILITY OF PRIVACY POLICY</b>
        <br />
        <br />
        This privacy policy applies to all information we collect through our
        web and mobile applications from current and former NomiTime users and
        visitors. When you are no longer our customer, we continue to share your
        information as described in this policy. This policy only applies to the
        NomiTime Services and does not apply to the practices of any other
        service. This policy also covers our treatment of any personally
        identifiable information that our business partners share with us.
        <br />
        <br />
        <br />
        <b>INFORMATION COLLECTED</b>
        <br />
        <br />
        When you use the NomiTime Services, you may be asked for certain
        personal information, including your name, email address, zip code,
        phone numbers, credit card information, occupation, hobbies and
        interests. Our website also automatically receives and records
        information on our server logs from your browser, including your IP
        address, browser type and NomiTime Cookie (defined below) information.
        <br />
        <br />
        As previously stated, we are committed to providing you a safe and
        secure user environment. Therefore, before permitting you to use
        NomiTime’s Services, we may require additional information from you that
        we can use to verify your identity, address or other information or to
        manage risk and compliance throughout our relationship. We may also
        obtain information about you from third parties such as identity
        verification, fraud prevention, and similar services. NomiTime collects
        data to operate effectively and provide better quality experiences. If
        you do not agree to our collection of the information, you may be
        limited or restricted in the NomiTime Services available to you.
        <br />
        <br />
        <br />
        <b>HOW NOMITIME USES PERSONAL DATA:</b>
        <br />
        <br />
        NomiTime uses this information to: <br />
        <br />– Provide, maintain, and improve the NomiTime Services; <br />
        <br />– Personalize the content you see; <br />
        <br />– Provide Customer Service; <br />
        <br />– Help protect the safety of NomiTime and its users, which
        includes blocking suspected spammers, investigating and addressing
        abuse, and enforcing the NomiTime Terms of Use and Privacy Policy <br />
        <br />– Inform you of updates to our services, security alerts, and
        other support and administrative messages; <br />
        <br />– Communicate with you about products, services, offers,
        promotions, and events, and provide other news and information we think
        will be of interest to you (for information about how to opt out of
        these communications, see “Choices” below); and <br />
        <br />– Monitor and analyze trends, usage, and activities in connection
        with the NomiTime Services.
        <br />
        <br />
        <br />
        <b>WEBSITE VISITORS</b>
        <br />
        <br />
        We gather information about all users collectively, such as what areas
        users visit most frequently and what services users access the most. We
        only use such data anonymously. This information helps us determine what
        is the most beneficial for our users and how we can continually create a
        better overall user experience.
        <br />
        <br />
        We may share information with our partners, and anonymized, so that they
        may also understand how users and visitors use our services. We may use
        data stitching, which is the process of combining your datasets from
        multiple sources, to better track website use. Our Website uses Google
        Analytics.
        <br />
        <br />
        <br />
        <b>INFORMATION FROM MINORS</b>
        <br />
        <br />
        We do not knowingly solicit, collect, or share information from any
        individuals under the age of 18.
        <br />
        <br />
        <br />
        <b>COOKIES</b>
        <br />
        <br />
        When you utilize the NomiTime Services, we—along with certain business
        partners and vendors—may use cookies and other tracking technologies
        (collectively, “Cookies”). We use Cookies as outlined in the “How Your
        Information Is Used Section.” Certain aspects and features of the
        NomiTime Services are only available through the use of Cookies, so if
        you choose to disable or decline Cookies, your use of the NomiTime
        Services may be limited or not possible.
        <br />
        <br />
        <br />
        <b>DO NOT TRACK</b>
        <br />
        <br />
        Do Not Track (“DNT”) is an optional browser setting that allows you to
        express your preferences regarding tracking by advertisers and other
        third parties. We do not respond to DNT signals.
        <br />
        <br />
        <br />
        <b>SHARING INFORMATION</b>
        <br />
        <br />
        When you use the NomiTime Services, certain information may be shared
        with other users and the public. For example:
        <br />
        <br />
        – When you submit a post or comment to the NomiTime Services, visitors
        to and users of the NomiTime Services will be able to see the content of
        your posts and comments, the username associated with your posts or
        comments, and the date and time you originally submitted the post or
        comment. Although some parts of the services may be private or
        quarantined, they may become public and you should take that into
        consideration before posting to the NomiTime Services.
        <br />
        <br />
        – When you send private messages or messages, the recipients of those
        messages will be able to see the content of your message, your username,
        and the date and time the message was sent. Please use caution when
        sharing information about yourself to third parties, as we have no
        control over how they will use the information you share with them.
        <br />
        <br />
        – When other users view your profile, they will be able to see
        information about your activities on the NomiTime Services, such as your
        username, prior posts and comments, etc.
        <br />
        <br />
        We will not share, sell, or give away any of our users’ personal
        information to third parties, unless one of the following circumstances
        applies:
        <br />
        <br />
        – We may share information with vendors, consultants, and other service
        providers who need access to such information to carry out work for us.
        A complete list of the types of these third parties is at Appendix I at
        the end of this Policy. These companies may have access to your personal
        information as necessary to perform their functions, and they are
        contractually obligated to maintain the confidentiality of any personal
        information in which they come in contact as part of their services to
        NomiTime.
        <br />
        <br />
        – If you participate in promotions, special offers, or other events or
        activities in connection with the NomiTime Services, we may share
        information with entities that partner with us to provide these
        offerings;
        <br />
        <br />
        – We may share information in response to a request for information if
        we believe disclosure is in accordance with, or required by, any
        applicable law, regulation, legal process or governmental request,
        including, but not limited to meeting national security or law
        enforcement requirements;
        <br />
        <br />
        – We may share information in response to an emergency if we believe
        it’s necessary to prevent imminent and serious bodily harm to a person;
        <br />
        <br />
        – We may share aggregated or anonymized information, which cannot
        reasonably be used to identify you;
        <br />
        <br />
        – We may share information between and among NomiTime, and its current
        and future parents, affiliates, subsidiaries, and other companies under
        common control and ownership; and
        <br />
        <br />
        – We may share information with your consent or at your direction.
        <br />
        <br />
        <br />
        <b>SOCIAL SHARING</b>
        <br />
        <br />
        The NomiTime Services may offer social sharing features or other
        integrated tools that let you share content or action you take using the
        NomiTime Services with other media. Your use of these features enables
        the sharing of certain information with your friends or the public,
        depending on the settings you establish with the third party that
        provides the social sharing feature. For more information about the
        purpose and scope of data collection and processing in connection with
        social sharing features, please visit the privacy policies of the third
        parties that provide these social sharing features.
        <br />
        <br />
        <br />
        <b>ACCOUNTS PAYABLE OR COLLECTIONS</b>
        <br />
        <br />
        It is your duty to make sure that you keep your account(s) in good
        standing with us. If you have an outstanding balance, or if you dispute
        your payment to us with your credit card or financial institution for
        any reason, please note that all information collected from your
        activity on our website may be disclosed to the bank and/or collections
        agency we work with for the purposes of establishing proof of users’
        identity, proof of use, proof that service was provided, and/or
        collecting any outstanding debt owed to us.
        <br />
        <br />
        <br />
        <b>INTERNATIONAL DATA</b>
        <br />
        <br />
        NomiTime is a worldwide service. We are based in the Malaysia and the
        information we collect is governed by the Contracts Act 1950 and common
        law. By accessing or using the NomiTime Services or otherwise providing
        information to us, you consent to the processing, transfer, and storage
        of information in and to the U.S. and other countries, where you may not
        have the same rights as you do under local law. <br />
        <br />
        Pending Privacy Shield Approval: In connection with NomiTime’s
        processing of personal data received from the European Union and
        Switzerland, we adhere to the E.U.-U.S. and Swiss-U.S. Privacy Shield
        Program (“Privacy Shield”) and comply with its framework and principles.
        For more information about Privacy Shield principles and to view our
        certification, please visit the U.S. Department of Commerce’s Privacy
        Shield website Please direct any inquiries or complaints regarding our
        compliance with the Privacy Shield principles to the email listed in the
        “Data Protection Officer” section below. <br />
        <br />
        If we do not resolve your complaint, you may submit your complaint free
        of charge to International Centre For Dispute Resolution-American
        Arbitration Association (ICDR-AAA) Privacy Shield Program Independent
        Recourse Mechanism based in the United States. Under certain conditions
        specified by the Privacy Shield Principles, you may also be able to
        invoke binding arbitration to resolve your complaint. We are subject to
        the investigatory and enforcement powers of the Federal Trade
        Commission. <br />
        <br />
        If we share E.U. or Swiss data with a third-party service provider that
        processes the data solely on our behalf, then we will be liable for that
        third party’s processing of E.U. or Swiss data in violation of the
        Privacy Shield Principles, unless we can prove that we are not
        responsible for the event giving rise to the damage.
        <br />
        <br />
        <br />
        <b>PROTECTION & STORAGE OF PERSONAL INFORMATION</b>
        <br />
        <br />
        Your personal information is protected by physical, electronic, and
        procedural safeguards in compliance with applicable U.S. federal and
        state regulations. We also use computer safeguards such as firewalls and
        data encryption. For example, we use SSL encryption to safeguard your
        credit card data when used in e-commerce transactions. In addition, we
        enforce physical access controls to our offices and files, and we
        authorize access to users’ personal information only for personnel who
        require it to fulfill their job responsibilities.
        <br />
        <br />
        We strive to ensure security on our systems. Despite our efforts, we
        cannot guarantee that personal information may not be accessed,
        disclosed, altered or destroyed by breach of our administrative,
        managerial, and technical safeguards. Therefore, we urge you to take
        adequate precautions to protect your personal data as well, including
        never sharing the username and password used in connection with your
        participation in the NomiTime Services. If NomiTime learns of a systems
        security breach, we may attempt to notify you electronically so that you
        can take appropriate protective steps.
        <br />
        <br />
        By using the NomiTime Services, you agree that NomiTime may communicate
        with you electronically. NomiTime may post a notice on the website or
        mobile application if a security breach occurs. We may also send an
        email to you at the email address you have provided to us. Depending on
        where you live, you may have a legal right to receive notice of a
        security breach in writing. To receive free written notice of a security
        breach (or to withdraw your consent from receiving electronic notice of
        a security breach) you should notify us of your request here.
        <br />
        <br />
        <br />
        <b>UPDATING ACCOUNT INFORMATION</b>
        <br />
        <br />
        NomiTime allows you to change your personal information at any time. To
        do so, simply log on to NomiTime with your username and password, and
        you will be able to update the information you have submitted.
        <br />
        <br />
        <br />
        <b>CHOICES</b>
        <br />
        <br />
        We also provide you with the opportunity to opt-in to receive these
        types of communications at the time of registration, but later decide to
        opt out of several types of communications at the time of registration.
        If you no longer want to receive them, simply change your preferences on
        your account settings or communicate your preferences to us via email.
        You may opt out of receiving promotional communications from us by
        following the instructions in those communications. If you opt out, we
        may still send you non-promotional communications, such as information
        about your account or your use of the NomiTime Services. With your
        consent, we may send promotional and non-promotional push notifications
        or alerts to your mobile device. You can deactivate these messages at
        any time by changing the notification settings on your mobile device.
        <br />
        <br />
        As a Data Subject in the European Economic Area, you have the right to
        request, access, rectify, withdraw, delete, and restrict how we process
        your Personal Data. These rights include the ability to review the
        Personal Data we have in our Information and Communications systems
        concerning you, the ability to make any corrections to that Personal
        Data, the ability to be informed of who that data may have been shared
        with, the ability to withdraw your consent for NomiTime to process your
        Personal Data, the ability to request that we delete all of your
        Personal Data, and the ability to restrict how we process your Personal
        Data.
        <br />
        <br />
        If you deactivate your account or request that NomiTime delete your
        Personal Data, NomiTime may still retain certain information associated
        with your account for analytical purposes and record-keeping integrity,
        as well as to prevent fraud, collect any fees owed, enforce our terms
        and conditions, take actions we deem necessary to protect the integrity
        of our website or our users, or take other actions otherwise permitted
        by the General Data Protection Regulation. In addition, if certain
        information has already been provided to third parties as described in
        our Privacy Policy, retention of that information will be subject to
        those third parties’ policies.
        <br />
        <br />
        <br />
        <b>CHANGES TO OUR PRIVACY POLICY</b>
        <br />
        <br />
        We may update this Privacy Policy from time to time. We will place any
        updates to this policy on our website. You may also request a paper copy
        of the Privacy Policy by contacting us at the email or address noted
        below. You are bound by any changes to the Privacy Policy by using the
        NomiTime Services after such changes have been posted to the website.
        <br />
        <br />
        <br />
        <b>DATA PROTECTION OFFICER</b>
        <br />
        <br />
        To communicate with our Data Protection Officer, please email
        support@nomitime.com
        <br />
        <br />
        <br />
        <b>CONTACT US</b>
        <br />
        <br />
        Whether you live in the SEA or outside SEA, NomiTime is responsible for
        your information. If you have any questions, You can contact NomiTime
        via the following email support@nomitime.com or at the following
        address:
        <br />
        <br />
        NIU TECH SDN BHD, Suite 13-10, Level 13,
        <br />
        Johor Bahru City Square Office Tower,
        <br />
        106-108, Jalan Wong Ah Fook,
        <br />
        80000 Johor Bahru, Malaysia. <br />
        <br />
        You can also contact our Data Protection Officer at the e-mail noted
        above.
        <br />
        <br />
        <br />
        <br />
        <b>APPENDIX I</b>
        <br />
        <br />
        Types of NomiTime Vendor Third Parties:
        <br />
        <br />– Web server hosting <br />
        <br />– Data analysis <br />
        <br />– Marketing services <br />
        <br />– Security services <br />
        <br />– Card and payment processors
        <br />
        <br />
        <span style={{ fontSize: 11 }}>
          To receive a copy of the complete list of third parties, please
          contact support@nomitime.com and use the subject line "Third Party
          Request". Use of the list is limited to compliance with Privacy Shield
          requirements. The list is proprietary and confidential and may not be
          used for any other purpose or distributed in any form; violation of
          this requirement is a violation of the Terms of Use governing this
          site, and its use and is subject to the Commercial Use provisions in
          the Terms of Use.
        </span>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    return (
      <div className={classes.root}>
        {redirect && <Redirect to={redirect} />}
        <Navbar title="Privacy Policy" gender={Backend.user.gender} />
        {this.renderContent()}
      </div>
    );
  }
}

PrivacyPolicy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrivacyPolicy);
