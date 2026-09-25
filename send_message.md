---
title: Send Message
layout: post
nav_order: 1
---

# Send Message Action
{: .no_toc }

---
## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

# Functionality
When any time I want to send a message to chat I use a custom Send Message action for a few reasons.
1. Allows me to later add the ability to send messages to other platforms if I want to multi-stream
2. Allows me to use other extensions for sending messages (There is a great one on the Streamerbot Discord that gives your twitch bot the bot badge!)
3. Allows anyone that uses my extensions to just change this action to make it match how they want to send messages

---

# Examples

## Basic Twitch
<img src="{{ site.baseurl }}/img/send_message/twitch.png" width="500"><br>
Twitch messages can be a reply, an announcement, or can be pinned. So we want to handle all those cases.


### 1. Check if Reply
{: .no_toc }
<img src="{{ site.baseurl }}/img/send_message/twitch_reply.png" width="500"><br>

<details markdown="1">
<summary>Add an If/Else statement for checking if replying</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} replyToMessage<br>
> <span>The argument for the message to reply to (NOTE there is no % cuz where are checking if it exists)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Does Not Exist
</details>

<details markdown="1">
<summary>Then we wanna double check if the reply isn't empty. So add another If/Else statement in the False of the one before (Just incase some wants to send 2 messages and ohave the first be reply so they empty the argument).</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} replyToMessage<br>
> <span>The argument for the message to reply to (NOTE there is % cuz where are checking if it null or empty)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Is Null or Empty
</details>

<details markdown="1">
<summary>Then we just simply send the message as a reply if the False of the If/Else.</summary>

{: .subaction-title }
> Twitch > Chat > Reply To Message
>
> <span>Reply Id:</span>{: .text-yellow-300} %replyToMessage%<br>
> <span>The argument for the message to reply to</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Message:</span>{: .text-yellow-300} %message%<br>
> <span>The argument for the message to send</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

And Finally just add a Break since we are done and a message was sent (so we don't have to have ever If/Else inside each other)

### 2. Check if Announcment
{: .no_toc }
<img src="{{ site.baseurl }}/img/send_message/twitch_announcment.png" width="500"><br>

<details markdown="1">
<summary>Add an If/Else statement for checking if announcment</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %isAnnouncement%<br>
> <span>The argument set to True if you want an announcement</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Equals<br><br>
> <span>Value:</span>{: .text-yellow-300} True
</details>

OPTIONALLY you could add a Switch Case with an extra argument for the color of the announcement.

<details markdown="1">
<summary>Then we just simply send the message as a reply in the True of the If/Else.</summary>

{: .subaction-title }
> Twitch > Chat > Send Announcement to Channel
>
> <span>Message:</span>{: .text-yellow-300} %message%<br>
> <span>The argument for the message to send</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

And Finally just add a Break since we are done and a message was sent (so we don't have to have ever If/Else inside each other)

### 3. Check if Pinned
{: .no_toc }
<img src="{{ site.baseurl }}/img/send_message/twitch_pinned.png" width="500"><br>
Something can be Pinned for 20min or until end of stream when sending a message so....

<details markdown="1">
<summary>Add an If/Else statement for checking if pinned for 20 min</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %20pin%<br>
> <span>The argument set as True if wanting the message pinned for 20 min </span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Equals<br><br>
> <span>Value:</span>{: .text-yellow-300} True
</details>

<details markdown="1">
<summary>Then we just simply send the message pinned for 20min.</summary>

{: .subaction-title }
> Twitch > Chat > Send Message to Channel
>
> <span>Message:</span>{: .text-yellow-300} %message%<br>
> <span>The argument for the message to send</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Pin:</span>{: .text-yellow-300} Marked as On
</details>

<details markdown="1">
<summary>Then Add another If/Else statement after the one above for checking if pinned until end of stream</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %20pin%<br>
> <span>The argument set as True </span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Equals<br><br>
> <span>Value:</span>{: .text-yellow-300} True
</details>

<details markdown="1">
<summary>Then we just simply send the message pinned until end of stream</summary>

{: .subaction-title }
> Twitch > Chat > Send Message to Channel
>
> <span>Message:</span>{: .text-yellow-300} %message%<br>
> <span>The argument for the message to send</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Pin:</span>{: .text-yellow-300} Marked as On <br><br>
> <span>Until stream ends:</span>{: .text-yellow-300} Marked as On
</details>

And Finally just add a Break since we are done and a message was sent (so we don't have to have ever If/Else inside each other)

### 4. Send Message Normally
{: .no_toc }
<img src="{{ site.baseurl }}/img/send_message/twitch_send.png" width="500"><br>
<details markdown="1">
<summary>If we have gotten past all the checks we just send the message as normal.</summary>

{: .subaction-title }
> Twitch > Chat > Send Message to Channel
>
> <span>Message:</span>{: .text-yellow-300} %message%<br>
> <span>The argument for the message to send</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
</details>

Full Action: [Download]({{ site.baseurl }}/downloads/SendMessageTwitch.sb)

---

## Basic Youtube
<img src="{{ site.baseurl }}/img/send_message/youtube.png" width="500"><br>
<details markdown="1">
<summary>Youtube sending messages is simple so we just send the message</summary>

{: .subaction-title }
> YouTube > Send Message to Channel
>
> <span>Message:</span>{: .text-yellow-300} %message%<br>
> <span>The argument for the message to send</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
</details>

Full Action: [Download]({{ site.baseurl }}/downloads/SendMessageYoutube.sb)

---

## Basic Kick
<img src="{{ site.baseurl }}/img/send_message/kick.png" width="500"><br>
Kick messages can be a reply or just a regular message. So we want to handle both those cases.

### 1. Check if Reply
{: .no_toc }
<img src="{{ site.baseurl }}/img/send_message/kick_reply.png" width="500"><br>

<details markdown="1">
<summary>Add an If/Else statement for checking if replying</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} replyToMessage<br>
> <span>The argument for the message to reply to (NOTE there is no % cuz where are checking if it exists)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Does Not Exist
</details>

<details markdown="1">
<summary>Then we wanna double check if the reply isn't empty. So add another If/Else statement in the False of the one before (Just incase some wants to send 2 messages and ohave the first be reply so they empty the argument).</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} replyToMessage<br>
> <span>The argument for the message to reply to (NOTE there is % cuz where are checking if it null or empty)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Is Null or Empty
</details>

<details markdown="1">
<summary>Then we just simply send the message as a reply if the False of the If/Else.</summary>

{: .subaction-title }
> Twitch > Chat > Reply To Message
>
> <span>Reply Id:</span>{: .text-yellow-300} %replyToMessage%<br>
> <span>The argument for the message to reply to</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Message:</span>{: .text-yellow-300} %message%<br>
> <span>The argument for the message to send</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

And Finally just add a Break since we are done and a message was sent (so we don't have to have ever If/Else inside each other)

### 2. Send Message Normally
{: .no_toc }
<img src="{{ site.baseurl }}/img/send_message/kick_send.png" width="500"><br>
<details markdown="1">
<summary>If we have gotten past all the checks we just send the message as normal.</summary>

{: .subaction-title }
> Twitch > Chat > Send Message to Channel
>
> <span>Message:</span>{: .text-yellow-300} %message%<br>
> <span>The argument for the message to send</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
</details>

Full Action: [Download]({{ site.baseurl }}/downloads/SendMessageTwitch.sb)

---

## Basic Multiplatform
<img src="{{ site.baseurl }}/img/send_message/multiplatform.png" width="500"><br>
<details markdown="1">
<summary>We can use the above actions to make one action for all platforms with a simple switch.</summary>

{: .subaction-title }
> Core > Logic > Switch
>
> <span>Input:</span>{: .text-yellow-300} %userType%<br>
> <span>The argument for the for the platform to send the message to (named userType to match the platform of command users more easily)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
</details>

Then just add a case for each platform and call the action from above
* youtube - Send Message (Basic Youtube)
* twitch - Send Message (Basic Twitch)
* kick - Send Message (Basic Kick)

Full Action: [Download]({{ site.baseurl }}/downloads/SendMessageMultiplatform.sb)



