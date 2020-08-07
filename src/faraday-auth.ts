import jwt, { SignOptions } from "jsonwebtoken";

/**
 * Options for signing a Faraday authentication token.
 */
export type SignFaradayAuthTokenOptions = {
  /**
   * The URL of the organization issuing this token.
   *
   * Example: "https://example.com/"
   */
  issuer: string;

  /**
   * A `string` or a `Buffer` containing the private signing key to use.
   */
  privateKey: string | Buffer;

  /**
   * A unique ID for this account, which will be passed to Faraday.
   */
  accountId: string;

  /**
   * (Optional.) A unique ID for this user, which will be passed to Faraday.
   */
  userId?: string;
};

/**
 * Sign an authentication token to pass to Faraday's IFRAME.
 *
 * @param {SignFaradayAuthTokenOptions} options Signing options.
 */
export function signFaradayAuthToken(
  options: SignFaradayAuthTokenOptions
): string {
  const accountId = options.accountId;
  const userId =
    typeof options.userId === "string" ? options.userId : "fdy!anonymous";
  const e = encodeURIComponent;
  const subject = `a=${e(accountId)}&u=${e(userId)}`;

  const signOptions: SignOptions = {
    algorithm: "RS256",
    expiresIn: "1d",
    issuer: options.issuer,
    audience: "https://embed.faraday.io/",
    subject,
  };
  return jwt.sign({}, options.privateKey, signOptions);
}
