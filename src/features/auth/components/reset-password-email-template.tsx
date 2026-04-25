import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

interface ResetPasswordEmailTemplateProps {
  resetPasswordLink: string;
}

export const ResetPasswordEmailTemplate = ({
  resetPasswordLink,
}: ResetPasswordEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Body className="bg-[#f6f9fc] py-2.5">
        <Preview>CM-HUB reset your password</Preview>
        <Container className="bg-white border border-solid border-[#f0f0f0] p-11.25">
          <Section>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-6.5">
              Hi dev,
            </Text>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-6.5">
              Someone recently requested a password change for your CM-HUB
              account. If this was you, you can set a new password here:
            </Text>
            <Button
              className="bg-[#007ee6] rounded text-white text-[15px] no-underline text-center font-dropbox-sans block w-52.5 py-3.5 px-1.75"
              href={resetPasswordLink}
            >
              Reset password
            </Button>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-6.5">
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-6.5">
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link className="underline" href={resetPasswordLink}>
                more security tips.
              </Link>
            </Text>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-6.5">
              Happy Coding!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

ResetPasswordEmailTemplate.PreviewProps = {
  resetPasswordLink: "https://www.dropbox.com",
} as ResetPasswordEmailTemplateProps;

export default ResetPasswordEmailTemplate;
