import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  AsyncStorage,
  ScrollView
} from "react-native";
import {
  Root,
  Container,
  Text,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  Toast,
  Icon,
  Card,
  Button,
  Body,
  Item,
  Header,
  Content,
  List,
  ListItem,
  CheckBox
} from "native-base";
import Modal from "react-native-modal";

const TermsAndCondition = () => {
  return (
    <View style={styles.tcContainer}>
      <Text style={styles.tcP}>Dear Member,</Text>
      <Text style={styles.tcP}>
        Please read and understand these Terms and Conditions of Using the App
        and the Services Offered by or Through the Ardour Mobile App (“Terms”,
        “Terms of Use”) carefully before using the Ardour Mobile App Services
        (“the Service”) operated by Ardour India Pvt. Ltd. (interchangeably “the
        Company”, “Ardour” “us”, “we”, or “our”). These Terms apply to all
        visitors to the Ardour Mobile App, current and future users who wish to
        access Ardour App or use the Service at present or in future. For
        details of the Service please refer to our “How Ardour App operates”
        section.
      </Text>
      <Text style={styles.tcP}>
        By accessing the Ardour App and/or using the Service you agree to be
        bound by these Terms. Your access and continuity thereof to the Ardour
        App and the use thereof is subject to your explicit acceptance of and
        continuous compliance with these Terms. In case you choose not to accept
        the Terms you are at liberty to check out from the Ardour App without
        any liability to Ardour India Pvt. Ltd..
      </Text>

      <Text style={styles.tcP}>1. Definitions:</Text>
      <Text style={styles.tcL}>
        {"\u2022"} Ardour App or Ardour Mobile App: Means the Ardour App mobile
        application using Android, iOS or Other platform of similar nature
        whether current or future.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} Company, “We”, “Us”, Ardour App” or “our” shall mean Ardour
        India Pvt. Ltd.…….. having its registered office at ………………...
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} End User: End user shall mean the ultimate user of The
        Service through Ardour Mobile App who is a Registered Retailer or
        Registered Supplier.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} Interim Retail Financing Agreement: shall mean the Agreement
        for Short Term Financial Support as entered into by and between the
        Company and a Registered Retailer in terms thereof.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} Service shall mean any one or more of the Services provided
        by the Company through Ardour Mobile App. For a complete list of
        Services please refer to “Our Services” section in Ardour App Mobile App
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"}Registered Retailer: Shall Mean any retailer who has
        registered himself/itself with the Ardour App for obtaining the Service
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} Registered Supplier: Shall Mean any stockiest, supplier,
        distributor, producer, manufacturer or any other intermediary who has
        registered himself/itself with the Ardour App for obtaining the Service.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} Short-Term Financial Support: shall mean the interim
        financial support / assistance provided by the Company to a Registered
        Retailer for purchasing the Products from the Sellers upon successful
        approval of an Invoice through the Ardour App.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} You/Your: You/Your shall mean a natural or legal person who
        is at least 18 years of age and could legally enter into a contract in
        India and could use the services and products provided on the Ardour
        Mobile App in accordance with the terms and conditions recorded
        hereinafter.
      </Text>
      <Text style={styles.tcP}>2. Creation of Account:</Text>
      <Text style={styles.tcL}>
        {"\u2022"} Ardour App Mobile App is freely accessible to the End User
        however; the End User will have to register with Ardour Mobile App and
        create their individual registration account prior to accessing any of
        the Service(s).
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} A Person who cannot enter into legally binding contract in
        accordance with the provisions of the Indian Contract Act, 1872
        including person below the age of 18 years or of unsound mind and
        un-discharged insolvents etc. are not entitled to use the Ardour App or
        any services thereof.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} When you create an account with us, you confirm that you are
        above the age of 18 and is legally capable of entering into legally
        binding contract in accordance with the provisions of the Indian
        Contract Act, 1872, and that the information you provide us is accurate,
        complete, and current at all times. Inaccurate, incomplete, or obsolete
        information may result in the immediate termination of your account on
        the Service.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} You are responsible for maintaining the confidentiality of
        your account and password, including but not limited to the restriction
        of access to your computer and/or account. You agree to accept
        responsibility for any and all activities or actions that occur under
        your account and/or password, whether your password is with our Service
        or a third-party service.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} You shall not use as a username the name of another person or
        entity or that is not lawfully available for use, a name or trademark
        that is subject to any rights of another person or entity other than
        you, without appropriate authorization. You may not use as a username
        any name that is offensive, vulgar or obscene.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} All registration information must be correct, complete and
        promptly updated by the End User each time it changes.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} You are registering yourself on Ardour App for obtaining the
        certain services like financial support services and such other similar
        services as may be added from time to time.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} We reserve the right to refuse service, terminate accounts,
        remove or edit content in our sole discretion.
      </Text>
      <Text style={styles.tcP}>3. Communication by the Company:</Text>
      <Text style={styles.tcL}>
        {"\u2022"} As a condition of using the Service you agree to subscribe to
        newsletters, marketing or promotional materials and other information we
        may send through emails / SMS/ Phone Calls. We will send you information
        regarding your account activity as well as updates about our Services
        and Products and promotional offers. You can opt-out of our promotional
        emails anytime by clicking the unsubscribe link at the bottom of any of
        our email correspondences.
      </Text>
      <Text style={styles.tcP}>4. Content</Text>
      <Text style={styles.tcL}>
        {"\u2022"} Our Service might allow you to post, link, store, share and
        otherwise make available certain information, text, graphics, videos, or
        other material (“Content”). You shall be responsible for the Content
        that you post on or through the Service, including its legality,
        reliability, and appropriateness
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} By posting Content on or through the Service, You represent
        and warrant that: (i) the Content is yours (you own it) and/or you have
        the right to use it and the right to grant us the rights and license as
        provided in these Terms, and (ii) that the posting of your Content on or
        through the Service does not violate the privacy rights, publicity
        rights, copyrights, contract rights or any other rights of any person or
        entity. We reserve the right to terminate the account of anyone found to
        be infringing on a copyright.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} You retain any and all of your rights to any Content you
        submit, post or display on or through the Service and you are
        responsible for protecting those rights. We take no responsibility and
        assume no liability for Content you or any third-party posts on or
        through the Service. However, by posting Content using the Service you
        grant us the right and license to use, modify, publicly perform,
        publicly display, reproduce, and distribute such Content on and through
        the Service.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} Ardour App. has the right but not the obligation to monitor
        and edit all Content provided by users.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} In addition, Content found on or through this Service are the
        property of Ardour App Contact, Inc. or used with permission. You may
        not distribute, modify, transmit, reuse, download, repost, copy, or use
        said Content, whether in whole or in part, for commercial purposes or
        for personal gain, without express advance written permission from us.
      </Text>
      <Text style={styles.tcP}>5. Intellectual Property</Text>
      <Text style={styles.tcL}>
        {"\u2022"} The trademarks, logos and service marks (“Marks”) displayed
        on the App are the property of The Company and other respective persons
        as claimed therein. End Users are prohibited from using any Marks for
        any purpose including, but not limited to use as meta-tags on other
        pages or sites on the World Wide Web without the written permission of
        The Company or such third party who may own the Marks. All information
        and content including any software programs available on or through the
        App (“Content”) is protected by copyright. End Users are prohibited from
        modifying, copying, distributing, transmitting, displaying, publishing,
        selling, licensing, creating derivative works or using any Content
        available on or through the App for commercial or public purposes.
      </Text>
      <Text style={styles.tcP}>6. Links To Other Web Sites</Text>
      <Text style={styles.tcL}>
        {"\u2022"} a. You agree and undertake that our Service may contain links
        to third party web sites or services that are not owned or controlled by
        us and accordingly we have no control over those third-party web sites
        or services, and thus we assume no responsibility for the content,
        privacy policies, or practices of any third party web sites or services.
        Furthermore, We do not warrant the offerings of any of these
        entities/individuals or their websites.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} b. You also agree and undertake that we shall not be
        responsible or liable, directly or indirectly, for any damage or loss
        caused or alleged to be caused by or in connection with use of or
        reliance on any such content, goods or services available on or through
        any such third party web sites or services.
      </Text>
      <Text style={styles.tcL}>
        {"\u2022"} c. We strongly advise you to read the terms and conditions
        and privacy policies of any third party web sites or services that you
        visit.
      </Text>
      <Text style={styles.tcP}>7. Monitoring</Text>
      <Text style={styles.tcL}>
        {"\u2022"} The Company shall have the right, but not the obligation, to
        monitor the content of the App at all times, including any chat rooms
        and forums that may hereinafter be included as part of the App, to
        determine compliance with this Agreement and any operating rules
        established by The Company, as well as to satisfy any applicable law,
        regulation or authorized government request. Without limiting the
        foregoing, The Company shall have the right to remove any material that
        The Company, in its sole discretion, finds to be in violation of the
        provisions hereof or otherwise objectionable.
      </Text>
      <Text style={styles.tcP}>8. License and App Access</Text>
      <Text style={styles.tcL}>
        {"\u2022"} We are granting you a limited permission to access and make
        use of the Ardour App. This permission does not include any downloading
        or copying of account information for the benefit of another vendor or
        any other third party; caching, unauthorized hypertext links to the App
        and the framing of any Content available through the App, uploading,
        posting, or transmitting any content that you do not have a right to
        make available (such as the intellectual property of another party);
        uploading, posting, or transmitting any material that contains software
        viruses or any other computer code, files or programs designed to
        interrupt, destroy or limit the functionality of any computer software
        or hardware or telecommunications equipment; any action that imposes or
        may impose (in the Company’s sole discretion) an unreasonable or
        disproportionately large load on the Company’s infrastructure; or any
        use of data mining, robots, or similar data gathering and extraction
        tools. You may not bypass any measures used by the Company to prevent or
        restrict access to the App. Any unauthorized use by you shall
        automatically terminate the permission granted to you by the Company. By
        using this App and by accepting to agree to these terms and conditions
        you also agree that you shall not hack or otherwise hire some third
        party to hack the App or use any other unauthorized means without a
        written consent of The Company and access any third-party information.
        You shall in such an event be liable of a criminal offence and The
        Company shall institute appropriate legal proceedings to claim
        liquidated damages without any reference to you. The Company also
        reserves rights to institute appropriate legal for any intellectual
        property rights violation or infringement caused by using this webApp
        whether by you or any person acting through you.
      </Text>
      <Text style={styles.tcP}>9. Termination</Text>
      <Text style={styles.tcL}>
        {"\u2022"} i. We may terminate or suspend your account and bar access to
        the Service immediately, without prior notice or liability, under our
        sole discretion, for any reason whatsoever and without limitation,
        including but not limited to a breach of the Terms.
      </Text>

      <Text style={styles.tcL}>
        {" "}
        ii. If you wish to terminate your account, you may simply discontinue
        using the Service.
      </Text>
      <Text style={styles.tcL}>
        iii. All provisions of the Terms which by their nature should survive
        termination shall survive termination, including, without limitation,
        ownership provisions, warranty disclaimers, indemnity and limitations of
        liability.
      </Text>
      <Text style={styles.tcP}>10. Indemnification</Text>
      <Text style={styles.tcL}>
        You agree to indemnify and hold the Company (and its officers,
        directors, agents, subsidiaries, joint ventures, and employees) harmless
        from any claim or demand, including reasonable attorneys’ fees, or
        arising out of or related to your breach of this T&C, or your violation
        of any law or the rights of a third party including but not limited to
        breach of any warranties, representations or undertakings or in relation
        to the non-fulfillment of any of your obligations under these Terms
        arising out of violation of any applicable laws, regulations including
        but not limited to Intellectual Property Rights, payment of statutory
        dues and taxes, claim of libel, defamation, violation of rights of
        privacy or publicity, loss of service by other subscribers and
        infringement of intellectual property or other rights. This clause shall
        survive the expiry or termination of these Terms.
      </Text>
      <Text style={styles.tcP}>11. App-Provided Email and Postings</Text>
      <Text style={styles.tcL}>
        The App may provide End Users with the ability to send email messages to
        other End Users and non-End Users and to post messages on the App. The
        Company is under no obligation to review any messages; information or
        content (“Postings”) posted on the App by End Users and assumes no
        responsibility or liability relating to any such Postings.
      </Text>
      <Text style={styles.tcL}>
        You understand and agree not to use any functionality provided by the
        App to post content or initiate communications that contain:
      </Text>
      <Text style={styles.tcL}>
        Any unlawful, harmful, threatening, abusive, harassing, defamatory,
        vulgar, obscene, profane, hateful, racially, ethnically or otherwise
        objectionable material of any kind, including, but not limited to, any
        material which encourages conduct that would constitute a criminal
        offense, give rise to civil liability or otherwise violate any
        applicable local, state, national or international law.
      </Text>
      <Text style={styles.tcL}>
        Advertisements or solicitations of any kind.
      </Text>
      <Text style={styles.tcL}>
        Impersonate others or provide any kind of false information.
      </Text>
      <Text style={styles.tcL}>
        Personal information such as messages which state phone numbers, social
        security numbers, account numbers, addresses, or employer references.
      </Text>
      <Text style={styles.tcL}>
        Messages by non-spokesperson employees of The Company purporting to
        speak on behalf of The Company or containing confidential information or
        expressing opinions concerning The Company.
      </Text>
      <Text style={styles.tcL}>
        Messages that offer unauthorized downloads of any copyrighted or private
        information.
      </Text>

      <Text style={styles.tcL}> Chain letters of any kind.</Text>
      <Text style={styles.tcL}>
        Identical (or substantially similar) messages to multiple recipients
        advertising any product or service, expressing a political or other
        similar message, or any other type of unsolicited commercial message.
      </Text>
      <Text style={styles.tcL}>
        This prohibition includes but is not limited to:
      </Text>
      <Text style={styles.tcL}>
        Using the Ardour invitations to send messages to people who don’t know
        you or who are unlikely to recognize you as a known contact;
      </Text>
      <Text style={styles.tcL}>
        Using the Ardour to connect to people who don’t know you and then
        sending unsolicited promotional messages to those direct connections
        without their permission; and
      </Text>
      <Text style={styles.tcL}>
        Sending messages to distribution lists, newsgroup aliases, or group
        aliases.
      </Text>

      <Text style={styles.tcP}>12. Your Privacy</Text>
      <Text style={styles.tcL}>
        Your privacy is important to us and we will protect it. We will not
        share your personal information with anyone other than as agreed by you
        in terms of the “Interim Retail Financing Agreement” or those listed in
        our Privacy Policy. Please read the Interim Retail Financing Agreement
        before signing and our Privacy Policy for detailed explanation. Please
        note that in case of any disconnect between the Interim Retail Financing
        Agreement and the Privacy Policy, the Interim Retail Financing Agreement
        shall prevail.
      </Text>
      <Text style={styles.tcL}>
        If you use the App, you are responsible for maintaining the
        confidentiality of your account and password, and for restricting access
        to your computer. You agree to accept responsibility for all activities
        that occur under your account or password. You also agree and understand
        that The Company shall not be responsible for any wrongful use of your
        account. Because of this, we strongly recommend that you exit from your
        account at the end of each session.{" "}
      </Text>
      <Text style={styles.tcL}>
        You must notify us immediately upon becoming aware of any breach of
        security or unauthorized use of your account.
      </Text>
      <Text style={styles.tcL}>
        The Company reserves the right to refuse service, terminate accounts, or
        remove or edit content in its sole discretion.{" "}
      </Text>
      <Text style={styles.tcP}>13. Absence or Limitation Of Liability</Text>
      <Text style={styles.tcL}>
        In no event shall Ardour App., nor its subsidiaries, employees,
        officers, affiliates, directors, agents, suppliers, shareholders,
        non-executive directors or its licensors be liable for any indirect,
        incidental, special, consequential or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from (i) your access to or use of or
        inability to access or use the Service; (ii) any conduct or content of
        any third party on the Service; (iii) any content obtained from the
        Service; and (iv) unauthorized access, misrepresentation, fraud,
        coercion, breach of trust, misappropriation, cheating or for any other
        such reason of the end users or of third parties whether based on
        warranty, contract, tort (including negligence) or any other legal
        theory, whether or not we have been informed of the possibility of such
        damage, and even if a remedy set forth herein is found to have failed of
        its essential purpose.{" "}
      </Text>
      <Text style={styles.tcL}>
        You understand and agree that the Company, is not in any manner
        whatsoever involved in creating, producing, transmitting or distributing
        products or services referred to on Ardour App. The Company is mere
        aggregator of information that is aimed at facilitating the overall
        well-being of the End User i.e. you. Accordingly, you understand and
        accept that the Company is no way liable for any direct, indirect,
        punitive, incidental, special, or consequential damages including but
        not limited to loss of profits and loss of goodwill or loss of interest
        that might result from either misrepresentation, fraud, coercion, breach
        of trust, misappropriation, cheating or for any other such reason of any
        third-party service provider.
      </Text>
      <Text style={styles.tcL}>
        This limitation of liability section shall prevail over any conflicting
        or inconsistent provision contained in any of the documents comprising
        this Agreement. It is up to you to take precautions to ensure that
        whatever you select for your use is free of such items as viruses,
        worms, trojan horses and other items of a destructive nature. You
        further waive any right to initiate any legal action against The Company
        for any misuse of the App by any person.
      </Text>
      <Text style={styles.tcL}>
        The Company, its associates and technology partners make no
        representations or warranties about the accuracy, reliability,
        completeness, current-ness and/or timeliness of any content,
        information, software, text, graphics, links or communications provided
        on or through the use of the App or that the operation of the App will
        be error free and/or uninterrupted. Consequently, The Company assumes no
        liability whatsoever for any monetary or other damage suffered by you on
        account of the delay, failure, interruption, or corruption of any data
        or other information transmitted in connection with use of the App;
        and/or any interruption or errors in the operation of the App. You
        expressly understand and agree that the Company and its subsidiaries,
        affiliates, officers, employees, agents, partners and licensors shall
        not be liable to you for any direct, indirect, incidental, special,
        consequential or exemplary damages, including, but not limited to,
        damages for loss of profits, goodwill, use, data or other intangible
        losses (even if The Company has been advised of the possibility of such
        damages), resulting from use of the App, sale and supply of Products
        content or any related goods and services.
      </Text>

      <Text style={styles.tcP}>
        14. Unforeseen Shutdown & Preventive Maintenance
      </Text>
      <Text style={styles.tcL}>
        User acknowledges that, although the internet is often a secure
        environment, sometimes there are interruptions in service or events that
        are beyond the control of The Company, and The Company shall not be
        responsible for any data lost while transmitting information on the
        internet.
      </Text>
      <Text style={styles.tcL}>
        While it is The Company’s objective is to make the App accessible 24
        hours per day, 7 days per week, the App may be unavailable from time to
        time for any reason including, without limitation, routine maintenance.
      </Text>
      <Text style={styles.tcL}>
        You understand and acknowledge that due to circumstances both within and
        outside of the control of the Company, access to the App may be
        interrupted, suspended or terminated from time to time.
      </Text>
      <Text style={styles.tcL}>
        The Company shall have the right at any time to change or discontinue
        any aspect or feature of the Company, including, but not limited to,
        content, hours of availability and equipment needed for access or use.
        Further, The Company may discontinue disseminating any portion of
        information or category of information, may change or eliminate any
        transmission method and may change transmission speeds or other signal
        characteristics.
      </Text>

      <Text style={styles.tcL}>
        Our App users may experience difficulty in accessing the App from 05:00
        AM to 0530 AM due to updates. Apart from this, The Company reserves the
        right to suspend the operation of the App for emergency maintenance with
        assurance of minimum down time. The Company shall also be at liberty to
        stop or pull down the App if so required by any Governmental or
        quasi-governmental authorities or the Executive Authorities.
      </Text>

      <Text style={styles.tcP}>15. Disclaimer</Text>
      <Text style={styles.tcL}>
        Your use of the Service is at your sole risk. The Service is provided on
        an “AS IS” and “AS AVAILABLE” basis. The Service is provided without
        warranties of any kind, whether express or implied, including, but not
        limited to, implied warranties of merchantability, fitness for a
        particular purpose, non-infringement or course of performance.
      </Text>
      <Text style={styles.tcL}>
        Ardour App. its subsidiaries, affiliates, and its licensors do not
        warrant that a) the Service will function uninterrupted, secure or
        available at any particular time or location; b) any errors or defects
        will be corrected; c) the Service is free of viruses or other harmful
        components; or d) the results of using the Service will meet your
        requirements.
      </Text>
      <Text style={styles.tcL}>
        The Company, its associates and technology partners make no
        representations or warranties about the accuracy, reliability,
        completeness, current-ness and/or timeliness of any content,
        information, software, text, graphics, links or communications provided
        on or through the use of the App or that the operation of the App will
        be error free and/or uninterrupted. Consequently, The Company assumes no
        liability whatsoever for any monetary or other damage suffered by you on
        account of the delay, failure, interruption, or corruption of any data
        or other information transmitted in connection with use of the App;
        and/or any interruption or errors in the operation of the App. You
        expressly understand and agree that The Company and its subsidiaries,
        affiliates, officers, employees, agents, partners and licensors shall
        not be liable to you for any direct, indirect, incidental, special,
        consequential or exemplary damages, including, but not limited to,
        damages for loss of profits, goodwill, use, data or other intangible
        losses (even if The Company has been advised of the possibility of such
        damages), resulting from use of the App, sale and supply of Products
        content or any related goods and services.
      </Text>

      <Text style={styles.tcP}>16. Changes</Text>
      <Text style={styles.tcL}>
        We reserve the right to change these Terms and Conditions of its Service
        without informing you. You should check and study our App for any
        updated Terms and Conditions.
      </Text>
      <Text style={styles.tcL}>
        By continuing to access or use our Service after any revisions become
        effective, you agree to be bound by the revised terms. If you do not
        agree to the new terms, you are no longer authorized to use the Service.
      </Text>
      <Text style={styles.tcP}>17. No Waiver:</Text>
      <Text style={styles.tcL}>
        Our failure to enforce any right or provision of these Terms will not be
        considered a waiver of those rights. If any provision of these Terms is
        held to be invalid or unenforceable by a court, the remaining provisions
        of these Terms will remain in effect. These Terms constitute the entire
        agreement between us regarding our Service, and supersede and replace
        any prior agreements we might have had between us regarding the Service.
      </Text>
      <Text style={styles.tcP}>18. Governing Law</Text>
      <Text style={styles.tcL}>
        These Terms shall be governed and construed in accordance with the laws
        of India and the Courts at Mumbai shall have exclusive jurisdiction over
        this contract.
      </Text>
      <Text style={styles.tcP}>Contact Us</Text>
      <Text style={styles.tcL}>
        If you have any questions about these Terms, please contact us.
      </Text>
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  CustomHeaderContainer: {
    flex: 2,
    padding: "5%",
    justifyContent: "center",
    alignContent: "center"
  },
  CustomHeaderText: {
    fontSize: 65,
    fontFamily: "Raleway-Light",
    alignSelf: "center"
  },
  CustomHeaderSubHeading: {
    fontSize: 14,
    alignSelf: "center",
    fontStyle: "italic",
    fontFamily: "OpenSans-Regular",
    color: "#bbcedd"
  },
  FormStyle: {
    padding: "10%",
    borderRadius: 8
  },
  ButtonStyle: {
    marginTop: "20%"
  },
  FormCardStyle: {
    flex: 3,
    marginBottom: "10%",
    marginRight: "10%",
    marginLeft: "10%",
    justifyContent: "center",
    alignContent: "center"
  },
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 22,
    alignSelf: "center"
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcP: {
    marginTop: 10,
    fontSize: 12
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcContainer: {
    marginTop: 5,
    marginBottom: 15
  },

  button: {
    backgroundColor: "#136AC7",
    borderRadius: 5,
    padding: 10
  },

  buttonDisabled: {
    backgroundColor: "#999",
    borderRadius: 5,
    padding: 10
  },

  buttonLabel: {
    fontSize: 14,
    color: "#FFF",
    alignSelf: "center"
  }
});
