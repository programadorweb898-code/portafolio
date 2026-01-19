
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
  Section,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <Html>
    <Head />
    <Preview>New message from your portfolio site</Preview>
    <Body style={{ backgroundColor: "#ffffff", fontFamily: "sans-serif" }}>
      <Container>
        <Heading style={{ color: "#333333", fontSize: "24px" }}>
          You received a new message from your contact form
        </Heading>
        <Section style={{ border: "1px solid #cccccc", padding: "20px" }}>
          <Text style={{ fontSize: "16px" }}>
            <strong>Name:</strong> {name}
          </Text>
          <Text style={{ fontSize: "16px" }}>
            <strong>Email:</strong> {email}
          </Text>
          <Text style={{ fontSize: "16px" }}>
            <strong>Message:</strong>
          </Text>
          <Text
            style={{
              fontSize: "14px",
              lineHeight: "1.5",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;

