export default function (fullName: string) {
  const oldName = fullName?.trim?.();
  const name = oldName ? ` ${oldName}` : "";

  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--$-->
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style="background-color:#f9f9f9;font-family:Helvetica, Arial, sans-serif;font-size:1.2rem">
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:600px;background-color:#ffffff;border-radius:8px;margin:40px auto;padding:40px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align:center;margin-bottom:30px">
              <tbody>
                <tr>
                  <td>
                    <img
                      title="ETH Enugu"
                      alt="ETH Enugu"
                      height="40"
                      src="https://asset.ethenugu.xyz/logo.png"
                      style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"
                      width="130" />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:1.2rem;line-height:1.5;margin-bottom:20px;margin-top:16px">
                      Hi${name},
                    </p>
                    <p
                      style="font-size:1.2rem;line-height:1.5;margin-bottom:20px;margin-top:16px">
                      Thank you for applying to mentor at the<!-- -->
                      <span style="font-weight:bold"
                        >ETH Enugu Conf/Summit &#x27;25</span
                      >
                      <!-- -->taking place from<!-- -->
                      <span style="font-weight:bold"
                        >August 4th - 16th, 2025</span
                      >. We&#x27;re excited to confirm receipt of your
                      application and sincerely appreciate your interest in
                      sharing your insights with all attendees.
                    </p>
                    <p
                      style="font-size:1.2rem;line-height:1.5;margin-bottom:20px;margin-top:16px">
                      Our organizing team is currently reviewing all mentor
                      submissions to curate a diverse, engaging, and
                      mission-aligned lineup. Your application is under
                      evaluation, and we&#x27;ll follow up with a decision in
                      the coming weeks.
                    </p>
                    <br />
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="font-size:1.2rem;line-height:1.5;margin-bottom:20px;margin-top:16px">
                              In the meantime, we encourage you to stay up to
                              date with our community updates on our official
                              channels below:
                            </p>
                            <a
                              href="https://x.com/Eth_Enugu"
                              style="color:#067df7;text-decoration-line:none;margin:100px 0"
                              target="_blank"
                              >➡ X (Formerly Twitter)</a
                            ><br /><a
                              href="https://chat.whatsapp.com/H2WEqw70d00E4uPBqt0lmm"
                              style="color:#067df7;text-decoration-line:none;margin:100px 0"
                              target="_blank"
                              >➡ WhatsApp Updates Group</a
                            ><br /><a
                              href="http://t.me/eth_enugu"
                              style="color:#067df7;text-decoration-line:none;margin:100px 0"
                              target="_blank"
                              >➡ Telegram</a
                            ><br /><a
                              href="https://ethenugu.xyz"
                              style="color:#067df7;text-decoration-line:none;margin:100px 0"
                              target="_blank"
                              >➡ Website</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="font-size:1.2rem;line-height:1.5;margin-bottom:20px;margin-top:16px">
                              Additionally, if you have any questions or need
                              further assistance, please feel free to reach out
                              to us at our official<!-- -->
                              <a
                                href="mailto:ethenugu@gmail.com"
                                style="color:#067df7;text-decoration-line:none;margin:100px 0"
                                target="_blank"
                                >email address</a
                              >.
                            </p>
                            <p
                              style="font-size:1.2rem;line-height:1.5;margin-bottom:20px;margin-top:16px">
                              Thank you once again for your interest in EthEnugu
                              &#x27;25 - we&#x27;re excited and looking forward
                              to what&#x27;s ahead.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <p
                      style="font-size:1.2rem;line-height:1.5;margin-bottom:20px;margin-top:16px">
                      Warm regards,
                    </p>
                    <p
                      style="font-size:1.2rem;line-height:1.5;margin-bottom:20px;margin-top:16px">
                      ETH Enugu Team
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
<!--/$-->

  `;
}
