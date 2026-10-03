---
title: Earning Currency
parent: Economy
layout: default
nav_order: 2

footnote1: <a href="#footnotes1" title='You can always just send a message through twitch or whatever platform you want but I use another action called Send Message Explained on the Send Message page, for compability with other extensions and platforms.'><sup>1</sup></a>
footnote2: <a href="#footnotes2" title="The Pay Currency and Get Balance Actions are created in my Economy Basics Tutorial/Extension. Feel free to use any other way for adjusting currency and getting a viewer's balance if you have a different existing implementation."><sup>2</sup></a>

last_modified_date: 2/10/2026
---

# Earning Currency
{: .no_toc }

---
## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

# Functionality

An economy system needs a way for viewer's to earn the currency. This is done by giving the viewer currency when certain triggers (or actions) happen. This extension adds a ton of ways that viewers can earn currency and shows how to give them currency in those situations.<br>
Ways to earn currency I've implemented are:
1. [Exchanging Channel Points](#exchanging-channel-points)
2. [Check In Redeem](#check-in-redeem)
3. [Subscribe/Resubscribe](#subscriptionresubscription)
4. [Gift Subscriptions](#gift-subscriptions)
5. [Watch Streak](#watch-streak)
6. [Using Bits](#using-bits)
7. [Raiding](#raiding)
8. [Sending Messages](#sending-messages)
9. [By Watch Time*](#by-watch-time-requires-c-code)

{: .fs-3 }
<div markdown="1">
\* Requires C# Code
</div>

Keep in mind most of these will be platform dependent and I will be showing how to do it with twitch but it could be implemented with any platform. Also these are just examples, you can allow viewers to earn currency in other ways using similar logic to the way these are implemented.


<hr style="border:1px solid gray">

# Prerequisites

You must have a global user variable for your currency setup in streamerbot. If you don't have one you can follow [this tutorial]({{ site.baseurl }}/Economy/basics.html) to make your own or even just grab the premade extension from that tutorial.

<hr style="border:1px solid gray">

# How To Make It Yourself

Each section will cover how to implement a way of earning currency as listed in [Functionality](#functionality). You can do all of them, some of them, or even use them to make your own.<br>
Skip around as you want and copying completed ones and just editing them for others can really speed up the process.

## Full Video
{: .no_toc }
<iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## Exchanging Channel Points
You can allow viewers to earn your currency by trading in twitch channel through channel point redeems.

### 1. Create Channel Point redeems
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_redeems.png" width="500"><br>
You can create the rewards on twitch or through streamerbot itself. I recommend through streamerbot because that will allow more control in streamerbot. Go to Platforms -> Twitch -> Channel Point Rewards to add new rewards or see your current ones.

<details markdown="1">
<summary>Add a Channel Point Redeem for each exchange value you want to allow.</summary>

{: .subaction-title }
> Add Twitch Channel Reward
>
> <span>Reward Name:</span>{: .text-yellow-300} Buy 10 Tokens<br>
> <span>The name of the redeem that the viewer sees. You want to set this relative to amount of currency the viewer will get.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Description:</span>{: .text-yellow-300} Exchange your channel points for 10 Tokens<br>
> <span>Description of the redeem. Recommend putting in the ammount they will earn from the redeem</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Cost:</span>{: .text-yellow-300} 1000<br>
> <span>The cost of the redeem. I will show you how to implement it so the cost determines how much they currency they get. (i.e. 1/100 of the cost is tokens earned, 1000 cost = 10 tokens)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 2. Create Action & Add triggers
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_add_action.png" width="500"><br>
Add a new action for when someone redeems your channel point redeems.

<details markdown="1">
<summary>Then add a Trigger for each channel point redeem to allow this one action to handle all of them at once.</summary>

{: .subaction-title }
> Twitch > Channel Reward > Reward Redemption
>
> <span>Reward:</span>{: .text-yellow-300} Buy 10 Tokens<br>
> <span>The channel point rewards you created in Step 1.</span>{: 	.text-grey-dk-000 .fs-3 } 

</details>

### 3. Get the amount of currency to give the viewer
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_get_amount.png" width="500"><br>
<details markdown="1">
<summary>Set an argument to the amount we want to give viewer, calculated from the cost of the redeem redeemed.</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount<br>
> <span>The name of the variable to store the amount we want to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} $math(%rewardCost%/100)$<br>
> <span>The actual amount to give the viewer. Using an inline math we can make it 1/100 of the cost of the redeem. Using a \ instead of a / will truncate the decimal so its always a whole number.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 4. Actually give the viewer the Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_give_currency.png" width="500"><br>

<details markdown="1">
<summary>Set arugments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} redeemer<br>
> <span>The name of the variable pay currency wants to know to adjust the redeemer.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} True<br>
> <span>Set to True since we want to give the currency to the person who redeemed the redeem.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} cost<br>
> <span>The name of the variable pay currency wants to know how much to adjust the viewer's currency by.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} -%amount%<br>
> <span>The amount to give the viewer. We set it to negative because pay currency decrements, so we "pay" a negative to give currency.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Pay Currency<br>
> <span>The action for actually adjusting a viewer's currency</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 5. (OPTIONAL) Get info for and send a message with new viewer balance
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_send_message.png" width="500"><br>

<details markdown="1">
<summary>Get the new balance of the viewer using the Get Balance Action{{ page.footnote2 }}.</summary>

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Get Balance<br>
> <span>The action for getting the current balance of the viewer. We don't need to set redeemer again cuz we set it earlier for the pay currency action</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Actually send the message by setting argument for the message and using a send message action.{{ page.footnote1 }}</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} message<br>
> <span>The name of the variable for the send message action to know what message to send.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} Thank you %user% for exchanging %rewardCost% for %amount% ~currencyNamePlural~. Your current ~currencyName~ balance is %balance% ~currencyNamePlural~<br>
> <span>The actual message to send. The example shows how to use a bunch of variables for a custom message. (Note, using ~ for global variables and % for local ones)</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} \[KA\] Send Message<br>
> <span>The action for actually sending a message</span>{: 	.text-grey-dk-000 .fs-3 }


</details>




---

## Check In Redeem
You can allow viewers to earn your currency by checking in once a day with a channel point redeem.

### 1. Create Channel Point redeem
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/check_in_redeem.png" width="500"><br>
You can create the reward on twitch or through streamerbot itself. I recommend through streamerbot because that will allow more control in streamerbot. Go to Platforms -> Twitch -> Channel Point Rewards to add a new reward or see your current ones.

<details markdown="1">
<summary>Add a Channel Point Redeem for checking in.</summary>

{: .subaction-title }
> Add Twitch Channel Reward
>
> <span>Reward Name:</span>{: .text-yellow-300} Check In<br>
> <span>The name of the redeem that the viewer sees.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Description:</span>{: .text-yellow-300} Daily Check in for 50 Tokens<br>
> <span>Description of the redeem the viewer sees</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Cost:</span>{: .text-yellow-300} 1<br>
> <span>The cost of the redeem. I set this to 1 since it will only be useable once a stream but you can set it to whatever you want.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Max Per User Per Stream:</span>{: .text-yellow-300} 1<br>
> <span>The amount of times each viewer can use this per stream. Set to 1 for a typical daily check-in.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Persist User Counter:</span>{: .text-yellow-300} Marked As On<br>
> <span>Makes streamer bot count the times viewers use the redeem even across multiple streams. (I turn this on for displaying it on redeem)</span>{: 	.text-grey-dk-000 .fs-3 } 

</details>

### 2. Create Action & Add trigger
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/check_in_add_action.png" width="500"><br>
Add a new action for when someone checks in.

<details markdown="1">
<summary>Then add a Trigger the check in channel point redeem</summary>

{: .subaction-title }
> Twitch > Channel Reward > Reward Redemption
>
> <span>Reward:</span>{: .text-yellow-300} Check In<br>
> <span>The channel point reward you created in Step 1.</span>{: 	.text-grey-dk-000 .fs-3 } 

</details>

### 3. Give the viewer the Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/check_in_give_currency.png" width="500"><br>

<details markdown="1">
<summary>Set arugments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>


{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount<br>
> <span>The name of the variable to store the amount we want to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 50<br>
> <span>The actual amount to give the viewer.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} redeemer<br>
> <span>The name of the variable pay currency wants to know to adjust the redeemer.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} True<br>
> <span>Set to True since we want to give the currency to the person who redeemed the redeem.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} cost<br>
> <span>The name of the variable pay currency wants to know how much to adjust the viewer's currency by.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} -%amount%<br>
> <span>The amount to give the viewer. We set it to negative because pay currency decrements, so we "pay" a negative to give currency.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Pay Currency<br>
> <span>The action for actually adjusting a viewer's currency</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 4. (OPTIONAL) Get info for and send a message with new viewer balance
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/check_in_send_message.png" width="500"><br>

<details markdown="1">
<summary>Get the new balance of the viewer using the Get Balance Action{{ page.footnote2 }}.</summary>

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Get Balance<br>
> <span>The action for getting the current balance of the viewer. We don't need to set redeemer again cuz we set it earlier for the pay currency action</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Determine if this is their first check-in or not. Then store a variable for singular or plural number of check ins.</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %userCounter%<br>
> <span>The amount of times the viewer has used the check in, tracked by streamerbot for us.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} 1

#### True (aka Singular)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} timesName <br>
> <span>Unquie name for the word to use for number of times a viewer has checked in</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} time

#### False (aka Plural)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} timesName <br>
> <span>Unquie name for the word to use for number of times a viewer has checked in</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} times

</details>

<details markdown="1">
<summary>Actually send the message by setting argument for the message and using a send message action.{{ page.footnote1 }}</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} message<br>
> <span>The name of the variable for the send message action to know what message to send.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} %user% has checked in %userCounter% %timesName% <3 You get %amount% ~currencyNamePlural~ for checking in <3 Your current ~currencyName~ balance is %balance%<br>
> <span>The actual message to send. The example shows how to use a bunch of variables for a custom message. (Note, using ~ for global variables and % for local ones)</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} \[KA\] Send Message<br>
> <span>The action for actually sending a message</span>{: 	.text-grey-dk-000 .fs-3 }


</details>

---

## Subscription/Resubscription

---

## Gift Subscriptions

---

## Watch Streak

---

## Using Bits

---

## Raiding

---

## Sending Messages

---

## By Watch Time (REQUIRES C# Code)


---

{: .fs-3 }
<div markdown="1">
<sup id="footnotes1">1</sup> You can always just send a message through twitch or whatever platform you want but I use another action called Send Message Explained <a href="{{ site.baseurl }}/send_message.html" target="_blank">here</a> for compability with other extensions and platforms.<br>
<sup id="footnotes2">2</sup> The Pay Currency and Get Balance Actions are created in my <a href="{{ site.baseurl }}/Economy/basics.html">Economy Basics Tutorial/Extension</a>. Feel free to use any other way for adjusting currency and getting a viewer's balance if you have a different existing implementation.<br>
</div>

<hr style="border:1px solid gray">

# Premade Extensions