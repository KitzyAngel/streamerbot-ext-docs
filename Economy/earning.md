---
title: Earning Currency
parent: Economy
layout: default
nav_order: 2

footnote1: <a href="#footnotes1" title='You can always just send a message through twitch or whatever platform you want but I use another action called Send Message Explained on the Send Message page, for compability with other extensions and platforms.'><sup>1</sup></a>
footnote2: <a href="#footnotes2" title="The Pay Currency and Get Balance Actions are created in my Economy Basics Tutorial/Extension. Feel free to use any other way for adjusting currency and getting a viewer's balance if you have a different existing implementation."><sup>2</sup></a>

last_modified_date: 9/10/2026
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
3. [Following](#following)
4. [Subscribe/Resubscribe](#subscriptionresubscription)
5. [Gift Subscriptions](#gift-subscriptions)
6. [Watch Streak](#watch-streak)
7. [Using Bits](#using-bits)
8. [Raiding](#raiding)
9. [Sending Messages](#sending-messages)
10. [By Watch Time*](#by-watch-time-requires-c-code)

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

<details markdown="1">
<summary>Add a new action for when someone redeems your channel point redeems.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Buy Currency <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

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
<summary>Set arguments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} redeemer<br>
> <span>The name of the variable pay currency wants to know to adjust the redeemer.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} True<br>
> <span>Set to True since we want to give the currency to the viewer who triggered the action.</span>{: 	.text-grey-dk-000 .fs-3 }

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

<details markdown="1">
<summary>Add a new action for when someone checks in.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Check In For Currency <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Then add a Trigger for the check in channel point redeem</summary>

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
<summary>Set arguments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>


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
> <span>Set to True since we want to give the currency to the viewer who triggered the action.</span>{: 	.text-grey-dk-000 .fs-3 }

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

## Following
You can allow viewers to earn your currency by following your channel.

### 1. Create Action & Add trigger
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/follow_add_action.png" width="500"><br>

<details markdown="1">
<summary>Add a new action for when someone follows.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Follow For Currency <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Then add a Trigger for follows</summary>

{: .subaction-title }
> Twitch > Channel > Follow
</details>

### 2. Give the viewer the Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/follow_give_currency.png" width="500"><br>

<details markdown="1">
<summary>Set arguments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>


{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount<br>
> <span>The name of the variable to store the amount we want to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 100<br>
> <span>The actual amount to give the viewer.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} redeemer<br>
> <span>The name of the variable pay currency wants to know to adjust the redeemer.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} True<br>
> <span>Set to True since we want to give the currency to the viewer who triggered the action.</span>{: 	.text-grey-dk-000 .fs-3 }

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

### 3. (OPTIONAL) Send a response message
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/follow_send_message.png" width="500"><br>

<details markdown="1">
<summary>Actually send the message by setting argument for the message and using a send message action.{{ page.footnote1 }} (I use anonymous followers so I set the message up with that in mind but you can change it to whatever you would like)</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} message<br>
> <span>The name of the variable for the send message action to know what message to send.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300}Thank you for the follow! Followers are anonymous but you have still earned %amount% ~currencyNamePlural~!<br>
> <span>The actual message to send. The example shows how to use a bunch of variables for a custom message. (Note, using ~ for global variables and % for local ones)</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} \[KA\] Send Message<br>
> <span>The action for actually sending a message</span>{: 	.text-grey-dk-000 .fs-3 }


</details>

---

## Subscription/Resubscription
You can allow viewers to earn your currency by subscribing and resubscribing 

### 1. Create Action & Add triggers
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/sub_add_action.png" width="500"><br>

<details markdown="1">
<summary>Add a new action for when someone subscribes or resubscribes.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Sub For Currency <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Then add a Trigger for both subscriptions & resubscriptions.</summary>

{: .subaction-title }
> Twitch > Subscriptions > Subscription

{: .subaction-title }
> Twitch > Subscriptions > Resubscription

</details>

### 2. Get the amount of currency to give the viewer
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/sub_get_amount.png" width="500"><br>
<details markdown="1">
<summary>Add a Switch/Case to figure out which tier the viewer subbed with</summary>

{: .subaction-title }
> Core > Logic > Switch
>
> <span>Input:</span>{: .text-yellow-300} %tier%<br>
> <span>The tier of the sub, set by streamerbot from twitch.</span>{: 	.text-grey-dk-000 .fs-3 }

#### case (prime, tier1)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount <br>
> <span>Name for variable for how much we going to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 100<br>
> <span>The amount of currency to give the viewer when they sub or resub at prime & tier 1 subs.</span>{: 	.text-grey-dk-000 .fs-3 }

#### case (tier2)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount <br>
> <span>Name for variable for how much we going to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 200<br>
> <span>The amount of currency to give the viewer when they sub or resub at tier 2 subs.</span>{: 	.text-grey-dk-000 .fs-3 }

#### case (tier3)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount <br>
> <span>Name for variable for how much we going to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 300<br>
> <span>The amount of currency to give the viewer when they sub or resub at tier 3 subs.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 3. Actually give the viewer the Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_give_currency.png" width="500"><br>

<details markdown="1">
<summary>Set arguments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} redeemer<br>
> <span>The name of the variable pay currency wants to know to adjust the redeemer.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} True<br>
> <span>Set to True since we want to give the currency to the viewer who triggered the action.</span>{: 	.text-grey-dk-000 .fs-3 }

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
<img src="{{ site.baseurl }}/img/Economy/earning/sub_send_message.png" width="500"><br>

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
> <span>Value:</span>{: .text-yellow-300} Thank you %user% for the %tier% sub! You earned %amount% ~currencyNamePlural~! Your current ~currencyName~ balance is %balance%<br>
> <span>The actual message to send. The example shows how to use a bunch of variables for a custom message. (Note, using ~ for global variables and % for local ones)</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} \[KA\] Send Message<br>
> <span>The action for actually sending a message</span>{: 	.text-grey-dk-000 .fs-3 }


</details>

---

## Gift Subscriptions
You can allow viewers to earn your currency by gifting subscriptions

### 1. Create Action & Add triggers
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/gift_add_action.png" width="500"><br>

<details markdown="1">
<summary>Add a new action for when someone gifts subscriptions.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Gift Sub For Currency <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Then add a Triggers for gifting one sub and many subs.</summary>

{: .subaction-title }
> Twitch > Subscriptions > Gift Bomb
>
> <span>Anonymous:</span>{: .text-yellow-300} Marked as Off<br>
> <span>Mark anonymous as off so anonymous gifts won't trigger this action since we don't know who gifted so can't give them currency.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Twitch > Subscriptions > Gift Subscription
>
> <span>Anonymous:</span>{: .text-yellow-300} Marked as Off<br>
> <span>Mark anonymous as off so anonymous gifts won't trigger this action since we don't know who gifted so can't give them currency.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 2. Check for Gift subs in a bomb 
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/gift_check_bomb.png" width="500"><br>
We need to ignore any single gift subs that are part of a bomb because we are handling gift bombs as well.

<details markdown="1">
<summary>So we add a If/Else to check for a single gift sub from a gift bomb.</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %fromGiftBomb%<br>
> <span>Variable streamerbot uses to tell us a single gift sub is from a bomb</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} True

#### True (aka Gift sub from bomb)
{: .no_toc }

{: .subaction-title }
> Core > Logic > Break
>
> <span>Just end the action since we are handling these subs as part of the whole gift bomb.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 3. Get the amount of currency to give the viewer
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/gift_get_amount.png" width="500"><br>
<details markdown="1">
<summary>Add a Switch/Case to figure out which tier the viewer gifted subs of</summary>

{: .subaction-title }
> Core > Logic > Switch
>
> <span>Input:</span>{: .text-yellow-300} %tier%<br>
> <span>The tier of the gift sub, set by streamerbot from twitch.</span>{: 	.text-grey-dk-000 .fs-3 }

#### case (tier1)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount <br>
> <span>Name for variable for how much we going to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 75<br>
> <span>The amount of currency to give the viewer when they gift tier 1 subs.</span>{: 	.text-grey-dk-000 .fs-3 }

#### case (tier2)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount <br>
> <span>Name for variable for how much we going to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 150<br>
> <span>The amount of currency to give the viewer when they gift tier 2 subs.</span>{: 	.text-grey-dk-000 .fs-3 }

#### case (tier3)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount <br>
> <span>Name for variable for how much we going to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 225<br>
> <span>The amount of currency to give the viewer when they gift tier 3 subs.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>


### 4. Adjust the amount by number of subs or months
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/gift_adjust_amount.png" width="500"><br>
We want to give currency for every month gifted and for every sub gifted in a bomb so we need to handle both.

<details markdown="1">
<summary>So add a If/Else to check for multiple gift subs</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} gifts<br>
> <span>Name of the variable streamerbot uses to tell us how many subs gifted in a bomb. (NOTE not using % because we are checking if it exists)</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Does Not Exist

#### True (aka a single gift sub)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount <br>
> <span>Name for variable for how much we going to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} $math(%amount%\*%monthsGifted%)$<br>
> <span>Simple inline math to multiple the amount we are giving the viewer by the number of months they are gifting.</span>{: 	.text-grey-dk-000 .fs-3 }

#### False (aka a gift bomb)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount <br>
> <span>Name for variable for how much we going to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} $math(%amount%\*%gifts%)$<br>
> <span>Simple inline math to multiple the amount we are giving the viewer by the number of subs they are gifting.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>


### 5. Actually give the viewer the Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_give_currency.png" width="500"><br>

<details markdown="1">
<summary>Set arguments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} redeemer<br>
> <span>The name of the variable pay currency wants to know to adjust the redeemer.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} True<br>
> <span>Set to True since we want to give the currency to the viewer who triggered the action.</span>{: 	.text-grey-dk-000 .fs-3 }

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

### 6. (OPTIONAL) Get info for and send a message with new viewer balance
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/gift_send_message.png" width="500"><br>

<details markdown="1">
<summary>Get the new balance of the viewer using the Get Balance Action{{ page.footnote2 }}.</summary>

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Get Balance<br>
> <span>The action for getting the current balance of the viewer. We don't need to set redeemer again cuz we set it earlier for the pay currency action</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Add an If/Else to check a single gift sub or multiple</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} gifts<br>
> <span>Name of the variable streamerbot uses to tell us how many subs gifted in a bomb. (NOTE not using % because we are checking if it exists)</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Does Not Exist

#### True (aka a single gift sub)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} numGiftMessage <br>
> <span>Name for a variable to have different text for one or multiple gift subs.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} a sub<br>
> <span>Text for when one sub is gifted</span>{: 	.text-grey-dk-000 .fs-3 }

#### False (aka a gift bomb)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} numGiftMessage <br>
> <span>Name for a variable to have different text for one or multiple gift subs.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} %gifts% subs<br>
> <span>Text for when multiple subs are gifted using the number of subs</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Actually send the message by setting argument for the message and using a send message action.{{ page.footnote1 }}</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} message<br>
> <span>The name of the variable for the send message action to know what message to send.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} Thank you %user% for gifting %numGiftMessage%! You earned %amount% ~currencyNamePlural~! Your current ~currencyName~ balance is %balance%<br>
> <span>The actual message to send. The example shows how to use a bunch of variables for a custom message. (Note, using ~ for global variables and % for local ones)</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} \[KA\] Send Message<br>
> <span>The action for actually sending a message</span>{: 	.text-grey-dk-000 .fs-3 }


</details>

---

## Watch Streak
You can allow viewers to earn your currency by getting twitch watch streaks.

### 1. Create Action & Add trigger
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/streak_add_action.png" width="500"><br>

<details markdown="1">
<summary>Add a new action for when someone gets a watch streak.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Streak For Currency <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Then add a Trigger for a Watch Streak</summary>

{: .subaction-title }
> Twitch > Chat > Watch Streak

</details>

### 2. Get the amount of currency to give the viewer
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/streak_get_amount.png" width="500"><br>
<details markdown="1">
<summary>Set an argument to the amount we want to give viewer, calculated from the number of the watch streak.</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount<br>
> <span>The name of the variable to store the amount we want to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} $math(if(%watchStreak% # 50 == 0, 100, 10))$<br>
> <span>The actual amount to give the viewer. Using an inline math we can make it give 100 currency when its a watch streak divisible by 50 and otherwise it gives 10 currency.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 3. Actually give the viewer the Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_give_currency.png" width="500"><br>

<details markdown="1">
<summary>Set arguments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>


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
> <span>Set to True since we want to give the currency to the viewer who triggered the action.</span>{: 	.text-grey-dk-000 .fs-3 }

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
<img src="{{ site.baseurl }}/img/Economy/earning/streak_send_message.png" width="500"><br>

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
> <span>Value:</span>{: .text-yellow-300} Thank you %user% for the %watchStreak%! You earned %amount% ~currencyNamePlural~! Your current ~currencyName~ balance is %balance%<br>
> <span>The actual message to send. The example shows how to use a bunch of variables for a custom message. (Note, using ~ for global variables and % for local ones)</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} \[KA\] Send Message<br>
> <span>The action for actually sending a message</span>{: 	.text-grey-dk-000 .fs-3 }


</details>

---

## Using Bits
You can allow viewers to earn your currency by using bits.

### 1. Create Action & Add trigger
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/bits_add_action.png" width="500"><br>

<details markdown="1">
<summary>Add a new action for when someone uses bits.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Bits For Currency <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Then add a Trigger for using Bits</summary>

{: .subaction-title }
> Twitch > Chat > Cheer

</details>

### 2. Get the amount of currency to give the viewer
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/bits_get_amount.png" width="500"><br>
<details markdown="1">
<summary>Set an argument to the amount we want to give viewer, calculated from the bits used.</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount<br>
> <span>The name of the variable to store the amount we want to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} $math(%bits%\10+1)$<br>
> <span>The actual amount to give the viewer. Using an inline math we can make it give 1 currency for every 10 bits used plus 1 so it always gives something. (Note the use of \ instead of / to do integer math, meaning it gets rid of any decimals)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 3. Actually give the viewer the Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/exchange_give_currency.png" width="500"><br>

<details markdown="1">
<summary>Set arguments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>


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
> <span>Set to True since we want to give the currency to the viewer who triggered the action.</span>{: 	.text-grey-dk-000 .fs-3 }

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
<img src="{{ site.baseurl }}/img/Economy/earning/bits_send_message.png" width="500"><br>

<details markdown="1">
<summary>Get the new balance of the viewer using the Get Balance Action{{ page.footnote2 }}.</summary>

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Get Balance<br>
> <span>The action for getting the current balance of the viewer. We don't need to set redeemer again cuz we set it earlier for the pay currency action</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Determine if a single bit or multiple were used. Then store a variable for singular or plural number of bits.</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %bits%<br>
> <span>The number of bits the viewer used, tracked by streamerbot for us.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} 1

#### True (aka Singular)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} bitName <br>
> <span>Unquie name for the word to use for number of bits used</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} bit

#### False (aka Plural)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} bitName <br>
> <span>Unquie name for the word to use for number of bits used</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} bits

</details>

<details markdown="1">
<summary>Determine if the amount being given to the viewer is singular or plural. Then store a variable for singular or plural amount.</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %amount%<br>
> <span>The amount we gave to the viewer of currency.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} 1

#### True (aka Singular)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amountName <br>
> <span>Unquie name for the word to use for the amount of currency we gave to the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value</span>{: .text-yellow-300} ~currencyName~<br>
> <span>The global variable for singular currency</span>{: 	.text-grey-dk-000 .fs-3 }

#### False (aka Plural)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amountName <br>
> <span>Unquie name for the word to use for the amount of currency we gave to the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value</span>{: .text-yellow-300} ~currencyNamePlural~<br>
> <span>The global variable for plural currency</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Determine if the new balance of the viewer is singular or plural. Then store a variable for singular or plural balance.</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %balance%<br>
> <span>The current balance of the viewer's currency.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} 1

#### True (aka Singular)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} balanceName <br>
> <span>Unquie name for the word to use for the balance of the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value</span>{: .text-yellow-300} ~currencyName~<br>
> <span>The global variable for singular currency</span>{: 	.text-grey-dk-000 .fs-3 }

#### False (aka Plural)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} balanceName <br>
> <span>Unquie name for the word to use for the balance of the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value</span>{: .text-yellow-300} ~currencyNamePlural~<br>
> <span>The global variable for plural currency</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Actually send the message by setting argument for the message and using a send message action.{{ page.footnote1 }}</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} message<br>
> <span>The name of the variable for the send message action to know what message to send.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} Thank you %user% for the %bits% %bitName%! You have earned %amount% %amountName% <3 You now have %balance% %balanceName%<br>
> <span>The actual message to send. The example shows how to use a bunch of variables for a custom message. (Note, using ~ for global variables and % for local ones)</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} \[KA\] Send Message<br>
> <span>The action for actually sending a message</span>{: 	.text-grey-dk-000 .fs-3 }


</details>


---

## Raiding
You can allow viewers to earn your currency by raiding.

### 1. Create Action & Add trigger
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/raid_add_action.png" width="500"><br>

<details markdown="1">
<summary>Add a new action for when someone raids.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Raid For Currency <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Then add a Trigger for raids</summary>

{: .subaction-title }
> Twitch > Raid > Raid
>
> <span>Min:</span>{: .text-yellow-300} 1<br>
> <span>The min number of people in a raid to get currency. (Set this if you are worried about people spaming small raids for currency)</span>{: 	.text-grey-dk-000 .fs-3 } 

</details>

### 2. Give the viewer the Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/raid_give_currency.png" width="500"><br>

<details markdown="1">
<summary>Set arguments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>


{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount<br>
> <span>The name of the variable to store the amount we want to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 100<br>
> <span>The actual amount to give the viewer.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} redeemer<br>
> <span>The name of the variable pay currency wants to know to adjust the redeemer.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} True<br>
> <span>Set to True since we want to give the currency to the viewer who triggered the action.</span>{: 	.text-grey-dk-000 .fs-3 }

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

### 3. (OPTIONAL) Get info for and send a message with new viewer balance
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/raid_send_message.png" width="500"><br>

<details markdown="1">
<summary>Get the new balance of the viewer using the Get Balance Action{{ page.footnote2 }}.</summary>

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Get Balance<br>
> <span>The action for getting the current balance of the viewer. We don't need to set redeemer again cuz we set it earlier for the pay currency action</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Get the pronouns of the viewer using the built-in integration and an If/Else for knowing if to use Has or Have.</summary>

{: .subaction-title }
> Integrations > Pronouns > Add Pronouns for User
>
> <span>User Login:</span>{: .text-yellow-300} %user%<br>
> <span>The viewer to get the pronouns of.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %pronounCurrentTenseLower%<br>
> <span>If the viewer should have "are" or "is" used with their pronouns.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} are<br>
> <span>Check to see if they use "are" because then we should use "have" (or use "has" if they use "is").</span>{: 	.text-grey-dk-000 .fs-3 }

#### True (aka uses "are")
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} pronounHas <br>
> <span>Unquie name for the variable to use for has/have</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} have

#### False (aka uses "is")
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} pronounHas <br>
> <span>Unquie name for the variable to use for has/have</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} has

</details>

<details markdown="1">
<summary>Actually send the message by setting argument for the message and using a send message action.{{ page.footnote1 }}</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} message<br>
> <span>The name of the variable for the send message action to know what message to send.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} %user% has earned %amount% ~currencyNamePlural~ for raiding \<3 %pronounSubject% now %pronounHas% %balance% ~currencyNamePlural~<br>
> <span>The actual message to send. The example shows how to use a bunch of variables for a custom message. (Note, using ~ for global variables and % for local ones)</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} \[KA\] Send Message<br>
> <span>The action for actually sending a message</span>{: 	.text-grey-dk-000 .fs-3 }


</details>

---

## Sending Messages
You can give users currency based on how messages they send.

### 1. Create Action & Add triggers
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/message_add_action.png" width="500"><br>

<details markdown="1">
<summary>Add a new action for when someone sends a message.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Messaging For Currency <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Exclude from Action Queue Pending/History:</span>{: .text-yellow-300} Marked as On<br>
> <span>Excludes the action from the history. I recommend turning this on for this action since it will be running with EVERY message so it would fill up your action history very quickly.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Then add a Trigger for any message</summary>

{: .subaction-title }
> Twitch > Chat > Chat Message

</details>


### 2. Check for a command
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/message_check_command.png" width="500"><br>
First we want to make sure the message sent wasn't a command so we don't include those in the count.

<details markdown="1">
<summary>So add a If/Else to check if the message is a command.</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %message%<br>
> <span>The message given to us by streamerbot</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation:</span>{: .text-yellow-300} Regex Match<br>
> <span>We are going to use a very simple regex to check it the message is a command</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} ^!<br>
> <span>This is a very simple regex. The ^ means the start of the text and the ! just checks if there is an !. So the regex only matches if the text starts with a ! (aka a command normally).</span>{: 	.text-grey-dk-000 .fs-3 }

#### True (aka is a command)
{: .no_toc }

{: .subaction-title }
> Core > Logic > Break
>
> <span>End the action early if its a command since we don't wanna count it.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>


### 3. Count viewer's messages
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/message_count.png" width="500"><br>
We only want to give the user currency every 10th message instead of every single message so we want to count the number they have sent this stream.

<details markdown="1">
<summary>So Add a Global Set to add to a temp variable for the user (tracking the num messages they sent).</summary>

{: .subaction-title }
> Core > Globals > Global (Set)
>
> <span>Destination:</span>{: .text-yellow-300} User(Redeemer)<br>
> <span>We want to store the count of messages for a viewer on themselves so we use the redeemer for where the variable is stored.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Persisted:</span>{: .text-yellow-300} Marked as Off<br>
> <span>If the message count is per stream or persists forever. I set this off so viewers get currency for sending every 10 messages per stream but you can turn it on if you want it to be every 10 messages overall.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Variable Name:</span>{: .text-yellow-300} numMessages<br>
> <span>Name of the variable to store in the viewer for the current message count.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Increment:</span>{: .text-yellow-300} 1<br>
> <span>Set to increment instead of Value to add 1 to their current message count</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>Then Add a Global Get t get their new message count for checking if they've earned currency.</summary>

{: .subaction-title }
> Core > Globals > Global (Get)
>
> <span>Source:</span>{: .text-yellow-300} User(Redeemer)<br>
> <span>We stored the count of messages for a viewer on themselves so we use the redeemer for where the variable is stored.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Persisted:</span>{: .text-yellow-300} Marked as Off<br>
> <span>This must match if you made the above persisted or not</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Variable Name:</span>{: .text-yellow-300} numMessages<br>
> <span>This must match the name of the variable above</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Destination Variable:</span>{: .text-yellow-300} numMessages<br>
> <span>The name of the variable in this action, for simiplicty we can just name it the same as the global variable</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Default Value:</span>{: .text-yellow-300} 0<br>
> <span>This should never happen since we just set the variable but we can just set it as 0 just incase</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 4. Check if 10 messages have been sent
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/message_count_check.png" width="500"><br>
Now we want to check if its the 10th, 20th, 30th, etc message sent (or however many you want to give currency at).

<details markdown="1">
<summary>So Add a If/Else to check if the message count if a multiple of 10</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} $math(%numMessages% # 10)$<br>
> <span>A inline math that gets te remanider of the numMessages (this must match the variable name you set in step 3) divided by 10 (# is Modulus).</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation:</span>{: .text-yellow-300} Equals<br><br>
> <span>Value:</span>{: .text-yellow-300} 0<br>
> <span>If the remanider of the numMessages divided by 10 is 0 that means its the 10th, 20th, 30th, etc message and we wanna give currency.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 5. Actually give the viewer the Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/message_give_currency.png" width="500"><br>
In the true of the If/Else we want to give them currency because they have sent enough messages

<details markdown="1">
<summary>Set arguments for Pay Currency Action{{ page.footnote2 }} and then Call it to adjust the viewer's currency.</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} amount<br>
> <span>The name of the variable to store the amount we want to give the viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 10<br>
> <span>The actual amount to give the viewer.</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} redeemer<br>
> <span>The name of the variable pay currency wants to know to adjust the redeemer.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} True<br>
> <span>Set to True since we want to give the currency to the viewer who triggered the action.</span>{: 	.text-grey-dk-000 .fs-3 }

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

---

## By Watch Time (REQUIRES C# Code)
You can allow viewers to earn currency by just hanging out in your stream. WARNING: This requires C# code & is dependent on Twitch's ablity to know who's in the stream which is famously inconsistent. 

### 1. Turn on Present Viewers
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/watch_time_present_viewers.png" width="500"><br>
We need to tell streamerbot to track who is active in stream first.

<details markdown="1">
<summary>On the Left go to Platforms -> Twitch (Or whatever platform you want) -> Settings -> Present Viewers</summary>

{: .subaction-title }
> Platforms > Twitch > Settings > Present Viewers
>
> <span>Enabled:</span>{: .text-yellow-300} Marked as On<br>
> <span>Turn on to allow streamerbot to track who is in your chat</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Live Update:</span>{: .text-yellow-300} Marked as On<br>
> <span>Make streamerbot use actual viewers instead of fake ones (only for Twitch).</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Update Interval:</span>{: .text-yellow-300} 10 minutes<br>
> <span>How often to check who is still in chat. (Keep in mind this will be how often you give currency).</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 1. Create Action & Add triggers
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/watch_time_add_action.png" width="500"><br>

<details markdown="1">
<summary>Add a new action for earning currency over time.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Currency Over Time <br>
> <span>Name for the action</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group:</span>{: .text-yellow-300} Economy Earning<br>
> <span>The name of the group to put this action in. (I recommend putting all the actions for earing currency in the same group to put them together)</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Exclude from Action Queue Pending/History:</span>{: .text-yellow-300} Marked as On<br>
> <span>Excludes the action from the history. I recommend turning this on for this action since it will be running with EVERY 10min (or whatever you set present time to) so it would fill up your action history.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>


<details markdown="1">
<summary>Then add a Trigger for present viewers</summary>

{: .subaction-title }
> Twitch > General > Present Viewers

</details>

### 2. Check if live
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/watch_time_check_live.png" width="500"><br>
First we want to make sure we are live so viewers don't get currency for hanging out in an offline stream. (We can disable this went testing to check if its working).

<details markdown="1">
<summary>So add a If/Else to check if stream is live.</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %isLive%<br>
> <span>If the stream is live given to us by streamerbot.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation:</span>{: .text-yellow-300} Equals<br><br>
> <span>Value:</span>{: .text-yellow-300} Faslse

#### True (aka is not live)
{: .no_toc }

{: .subaction-title }
> Core > Logic > Break
>
> <span>End the action early if not live we don't want to give anyone currency.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 3. Set arguments for use in code
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/watch_time_set_args.png" width="500"><br>
Before running any code we want to set some arguments to be used in the code for easily changing later without having to touch the code.

<details markdown="1">
<summary>So add some set arguments.</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} currencyPer<br>
> <span>The name of the variable for how much currency we want to given every present check. (i.e. every 10 min).</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} 10<br>
> <span>The actual amount we give the viewer every present check. (i.e. 10 currency every 10 min).</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} currencyVar<br>
> <span>The name of the variable the code uses to know what variable we store our currency in on every viewer</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} balance<br>
> <span>The name of the global user variable your currency is stored on each viewer. If you are following my tutorials and/or using my extensions this will just be balance</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 4. Execute Code to give Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/watch_time_code.png" width="500"><br>
Now we add the code to get all the present viewers and give them currency.

<details markdown="1">
<summary>So add a C# Excute Code with the following code (Explained in comments)</summary>

{: .subaction-title }
> Core > C# > Excute C# Code
>```javascript
>using System;
>using System.Collections.Generic;
>
>public class CPHInline
>{
>   public bool Execute()
>   {
>        // Get the viewers in chat given by streamerbot
>        CPH.TryGetArg("users", out List<Dictionary<string, object>> users);
>
>        // Get the amount of currency per present check we set in this action
>        CPH.TryGetArg("currencyPer", out int currencyPer);
>
>        // Get the name of currency variable we set in this action
>        CPH.TryGetArg("currencyVar", out string currencyVar);
>
>        // Loop through each viewer
>        foreach(Dictionary<string, object> user in users){
>
>           // Check if they are following
>           if(CPH.TwitchGetExtendedUserInfoById((string)user["id"]).IsFollowing){
>                
>               // Gets the viewer's current currency balance
>               int balance = CPH.GetTwitchUserVarById<int>((string)user["id"], currencyVar, true);
>
>               // Set the viewer's currency balance to the current amount plus the amount we want to give them
>               CPH.SetTwitchUserVarById((string)user["id"], currencyVar, balance+currencyPer, true);
>
>           }
> 
>        }
>
>        return true;
>   }
>}
>```
</details>

---

{: .fs-3 }
<div markdown="1">
<sup id="footnotes1">1</sup> You can always just send a message through twitch or whatever platform you want but I use another action called Send Message Explained <a href="{{ site.baseurl }}/send_message.html" target="_blank">here</a> for compability with other extensions and platforms.<br>
<sup id="footnotes2">2</sup> The Pay Currency and Get Balance Actions are created in my <a href="{{ site.baseurl }}/Economy/basics.html">Economy Basics Tutorial/Extension</a>. Feel free to use any other way for adjusting currency and getting a viewer's balance if you have a different existing implementation.<br>
</div>

<hr style="border:1px solid gray">

# Premade Extensions

## Short Video
{: .no_toc }
<iframe height="560" width="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## Basic Extension
This extension includes all the ways for your viewers to earn money as listed above that does NOT require C# code.

### 1. IMPORTANT: Check Overrides
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/premade_overrides.png" width="500"><br>
If you have imported any of my other extensions this extension will override the following actions:
* Pay Currency
* Get Balance
* [KA] Send Message

So, if you have made any changes to these methods. Duplicate them before importing this extension to keep your changes.


### 2. Import the extension
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/premade_import.png" width="500"><br>
Download the [extension]({{ site.baseurl }}/downloads/EconomyEarning.sb). Then click Import at the top of streamerbot and drag the file into the box. Then click Import then Ok.

### 3. Replace Overrides if needed
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/premade_replace_overrides.gif" width="500"><br>
If you did duplicate any actions in step 1. Copy their contents back into the original, now overriden, actions.

### 4. Create Name of your Currency if needed
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/add_currency_global_variables.png" width="500"><br>
If you haven't used any of my economy extensions before you need 2 Global variables for the name of your currency. If you have imported or made yourself one of my other economy extensions you can skip this step.<br><br>
So Create 2 Global Variables for the name of your currency for the viewers to see! Making them global variables makes it much easier if you want to rename your currency at any point.<br><br>
Click Global Variables at the top, then Persisted Globals, then right click in table and click 'Add'. 

<details markdown="1">
<summary>
Then add a variable for the singular name of your currency and one for the plural name of your currency.
</summary>

{: .subaction-title }
> Add Global Variable
> 
> <span>Variable</span>{: .text-yellow-300} currencyName<br>
> <span>The name of the variable for the singular name of your currency</span>{: .text-grey-dk-000 .fs-3 }<br><br>
> <span>Value</span>{: .text-yellow-300} token<br>
> <span>The singular name of your currency</span>{: .text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Add Global Variable
> 
> <span>Variable</span>{: .text-yellow-300} currencyNamePlural<br>
> <span>The name of the variable for the plural name of your currency</span>{: .text-grey-dk-000 .fs-3 }<br><br>
> <span>Value</span>{: .text-yellow-300} tokens<br>
> <span>The plural name of your currency</span>{: .text-grey-dk-000 .fs-3 }

</details>

### 5. Turn on any ways to earn currency you want
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/premade_turn_on_actions.png" width="500"><br>
Enable any actions in the Economy Earning Group for ways you would like your viewers to earn your currency.<br>

### 6. Add needed Channel Point Redeems
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/premade_add_redeems.png" width="500"><br>
If you turned on any of the following actions they have channel point redeems you must create them:
* Check In For Currency: See [here](#1-create-channel-point-redeem) on how and what to create
* Buy Currency: See [here](#1-create-channel-point-redeems) on how and what to create

<img src="{{ site.baseurl }}/img/Economy/earning/premade_update_triggers.png" width="500"><br>
Then Update the triggers for those actions to use the redeems you created.

### 7. OPTIONALLY: Change earning amounts and messages
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/premade_change_amounts.png" width="500"><br>
Change the amount viewer's earn and/or message for each action to what you want. Found under blue comments in the actions.

---

## Watch Time extension (HAS C# CODE)
This extension is just the way for viewer's to earn currency over time. Seperated because it has C# Code.

### 1. Import the extension
{: .no_toc }
Follow the steps 1-4 from the basic extension above but using [this]({{ site.baseurl }}/downloads/EconomyEarningOverTime.sb) download instead.

### 2. Turn on Present Viewers
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/watch_time_present_viewers.png" width="500"><br>
We need to tell streamerbot to track who is active in stream first.

<details markdown="1">
<summary>On the Left go to Platforms -> Twitch (Or whatever platform you want) -> Settings -> Present Viewers</summary>

{: .subaction-title }
> Platforms > Twitch > Settings > Present Viewers
>
> <span>Enabled:</span>{: .text-yellow-300} Marked as On<br>
> <span>Turn on to allow streamerbot to track who is in your chat</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Live Update:</span>{: .text-yellow-300} Marked as On<br>
> <span>Make streamerbot use actual viewers instead of fake ones (only for Twitch).</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Update Interval:</span>{: .text-yellow-300} 10 minutes<br>
> <span>How often to check who is still in chat. (Keep in mind this will be how often you give currency).</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 3. Change currency variable if needed
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/premade_watchtime_change_variable.png" width="500"><br>
Change the name of the variable for your currency if it's different than the default I use in my extensions by changing the value in the set Argument for %currencyVar%.

### 4. OPTIONALLY: Change earning amount per time
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/earning/premade_watchtime_change_amount.png" width="500"><br>
Change the amount viewer's earn per time you set when setting the present viewer settings (step 1) if you want by changing the value in the set Argument for %currencyPer%