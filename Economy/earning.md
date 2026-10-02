---
title: Earning Currency
parent: Economy
layout: default
nav_order: 2

footnote1: <a href="#footnotes1" title=' You can always just send a message through twitch or whatever platform you want but I use another action called Send Message Explained on the Send Message page, for compability with other extensions and platforms.'><sup>1</sup></a>

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

An economy system needs a way for viewer's to earn the currency. This is done by giving the viewer currency when certain triggers (or actions) happen. This extension adds a ton of ways that users can earn currency and shows how to give them currency in those situations.<br>
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

Each section will cover how to implement a way of earning currency as listed in [Functionality](#functionality). You can do all of them, some of them, or even use them to make your own.

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
<summary>Set an argument to the amount we want to give user, calculated from the cost of the redeem redeemed.</summary>

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
We use the Pay Currency Action created in the [Economy Basics Tutorial/Extension]({{ site.baseurl }}/Economy/basics.html). Go there to learn how to make it if you don't have it or you can just adjust the currency yourself however you want to if you know how.

<details markdown="1">
<summary>Set an arugment to let the pay currency action know we want to affect the redeemer (person who used the redeem) and how much to give them.</summary>

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
> <span>The amount to give the user. We set it to negative because pay currency decrements, so we "pay" a negative to give currency.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 5. (OPTIONAL) Get info for and send a message with new viewer balance
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_send_message.png" width="500"><br>

<details markdown="1">
<summary>Get the new balance of the viewer using the action we created in [Economy Basics Tutorial/Extension]({{ site.baseurl }}/Economy/basics.html). You can get balance another you know how to if you would like. </summary>

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
</div>

<hr style="border:1px solid gray">

# Premade Extensions