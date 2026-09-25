---
title: Basics
parent: Economy
layout: post
nav_order: 1
---

# Economy Basics
{: .no_toc }

---
## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

# Functionality

An economy system is all based on a currency that each user has. (i.e. Tokens, coins, rings, etc). So the first step is to keep track of each user's currency for both earning and using in your economy.<br><br>
This is done in streamerbot using a global persisted user variable. Global, meaning it can be accessed from any action, persisted, meaning it stays the same value even after restart of streamerbot, and user variable, meaning a variable tied to each user or viewer.<br><br>
This extension first adds two basic but powerful actions for adjusting each users currency and for getting each users currency so they can easily be reused by anything else in your economy. These are made as seprate actions for 2 reasons.<br>
1. So its easier to share with others and they can just change these actions to match their own currency. 
2. So if you ever want to change your currency later you only need to change it here.<br><br>

[//]: # (End List)
Then it adds a command for viewing a player's current currency and for giving/taking currency from any user.<br>

<hr style="border:1px solid gray">

# How To Make It Yourself

## Full Video
{: .no_toc }
<iframe width="500" src="https://youtu.be/QJWo4mBWG2s"></iframe>

---

## Get Balance Action
Action for getting user currency. It can get from the target[<sup>1</sup>](#footnotes1) or redeemer[<sup>2</sup>](#footnotes2).<br><br>
I designed it this way to both make it more flexible and because, youtube for example, can't do target user but things like a streamerbot deck can't do redeemer user.

### 1. Add Action
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/get_balance_add_action.png" width="500"><br>
<details markdown="1">
<summary>First you need an action for getting each users current balance. So create a basic action for this.</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Get Balance<br>
> <span>Whatever you wanna name the action for getting the currency of a user</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Group:</span>{: .text-yellow-300} Economy<br>
> <span>Group name for your economy actions</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Exclude from Action Queue Pending/History:</span>{: .text-yellow-300} Marked On<br>
> <span>Since this is an action that will be used only by other actions we can exclude it from action history since the other action will show up in action history.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>


### 2. Check If Redeemer and Get Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/get_balance_get_currency.png" width="500"><br>
Then when using this action you may want to get the currency of the target[<sup>1</sup>](#footnotes1) or redeemer[<sup>2</sup>](#footnotes2). We are going to do this very simply using an argument set by the action calling this action.

<details markdown="1">
<summary>So add an If/Else statement</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %redeemer%<br>
> <span>The argument set by the action calling this action if it wants the currency of the redeemer[<sup>2</sup>](#footnotes2) or the target[<sup>1</sup>](#footnotes1)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Equals<br><br>
> <span>Value:</span>{: .text-yellow-300} True
</details>

<details markdown="1">
<summary>
Then in the True result of the If/Else add a Global (Get) sub-action to get the balance of the redeemer
</summary>

{: .subaction-title }
> Core > Globals > Global (Get)
> 
> <span>Source:</span>{: .text-yellow-300} User (Redeemer)<br>
> <span>The currency is from the redeemer[<sup>2</sup>](#footnotes2)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Presisted:</span>{: .text-yellow-300} marked as on<br>
> <span>Meaning the currency won't reset with streamerbot closing</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Variable Name:</span>{: .text-yellow-300} whatever you want the currency to be called internally (i.e. balance)<br>
> <span>This is NOT what users see, this is just for you. If you want to use my extensions without having to change this on them as well, set this to balance.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Destination Variable:</span>{: .text-yellow-300} same as Variable Name (i.e. balance)<br>
> <span>This is the local name of the currency, easier to just match to the global</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Default value:</span>{: .text-yellow-300} 0<br>
> <span>whatever you want a user to have if they have never earned any currency from your economy yet</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

<details markdown="1">
<summary>
Then in the False result of the If/Else add another Global (Get) sub-action to get the balance of the target
</summary>

{: .subaction-title }
> Core > Globals > Global (Get)
> 
> <span>Source:</span>{: .text-yellow-300} User (Target)<br>
> <span>The currency is from the target[<sup>1</sup>](#footnotes1)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Presisted:</span>{: .text-yellow-300} marked as on<br>
> <span>Meaning the currency won't reset with streamerbot closing</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Variable Name:</span>{: .text-yellow-300} whatever you want the currency to be called internally (i.e. balance)<br>
> <span>This is NOT what users see, this is just for you. If you want to use my extensions without having to change this on them as well, set this to balance.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Destination Variable:</span>{: .text-yellow-300} same as Variable Name (i.e. balance)<br>
> <span>This is the local name of the currency, easier to just match to the global</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Default value:</span>{: .text-yellow-300} 0<br>
> <span>whatever you want a user to have if they have never earned any currency from your economy yet</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

---

## Pay Currency Action
Action for adjusting a user's currency. Defaults to taking away (subtracting) the given amount but you can give a negative amount to effectively add.<br><br>
I designed it this way to allow the function to handle raw user input of cost for common commands in an economy so you don't have to keep validating cost input in every command.
<img src="{{ site.baseurl }}/img/Economy/basics/pay_currency_action.png" width="500"><br>


### 1. Add Action
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/get_balance_add_action.png" width="500"><br>
<details markdown="1">
<summary>
Next you need an action for adjusting the balance of users. So create a basic action for this.
</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Pay Currency<br>
> <span>Whatever you wanna name the action for adjusting the currency of a user. I name it Pay cuz the default will subtract from a users balance.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Group:</span>{: .text-yellow-300} Economy<br>
> <span>Group name for your economy actions. (want the same group as your Get Balance Action)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Exclude from Action Queue Pending/History:</span>{: .text-yellow-300} Marked On<br>
> <span>Since this is an action that will be used only by other actions we can exclude it from action history since the other action will show up in action history.</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

### 2. Check if cost is a valid number
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/pay_currency_check_if_valid_number.png" width="500"><br>
First we want to check if the cost given by the action calling this action is a valid number. This is done so that we can just give it user inputted number if we want.
<details markdown="1">
<summary>
Add a If/Else statement
</summary>

{: .subaction-title }
> Core > Logic > If/Else
> 
> <span>Input:</span>{: .text-yellow-300} %cost%<br>
> <span>argument set by the action calling this action</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Regex Match<br>
> <span>Check the cost against a regular expression</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Value:</span>{: .text-yellow-300} ^(\+\|-)?\d{1,9}
</details>

I highly recommend learning regular expressions but they just check if a text follows a pattern.
<details markdown="1">
<summary>A simple breakdown of this one</summary>

{: .subaction-title }
> Regex
> 
> <span>^</span>{: .text-yellow-300} the start of the text<br><br>
> <span>(\+\|-)?</span>{: .text-yellow-300} match a single + or - or nothing<br><br>
> <span>\d{1,9}</span>{: .text-yellow-300} 1 to 9 number digits<br><br>
> <span>$</span>{: .text-yellow-300} the end of the text
</details>

So This one checks if cost is a 1 to 9 digit number that can have a plus or minus in front of it.<br>

<details markdown="1">
<summary>
Then in the False add a set argument (To let the action that called this action know we didn't actually change any currency)
</summary>

{: .subaction-title }
> Core > Argument > Set Argument
> 
> <span>Variable Name:</span>{: .text-yellow-300} result<br>
> <span>Name of the argument the action calling this action will use to see if the user's currency was actually adjusted</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} False
</details>

<details markdown="1">
<summary>
Then add another If/Else for checking if a message was given for an invalid number
</summary>

{: .subaction-title }
> Core > Logic > If/Else
> 
> <span>Input:</span>{: .text-yellow-300} NaNMessage<br>
> <span>The argument set if the action calling wants to send a message when an invalid number is inputted. Notice there is no % because we are using the Does not Exist Operation</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Does not Exist<br>
> <span>Checks if the message was given</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

Then in the False of that If/Else (because false means the message exists) send the message given.[<sup>3</sup>](#footnotes3)<br><br>

### 3. Check for a minimum cost
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/pay_currency_if_minCost.png" width="500"><br>
Next if it is a number we want to check if the cost is above a given minimum (if any).
<details markdown="1">
<summary>
In the True of step 1's If/Else add another If/Else
</summary>

{: .subaction-title }
> Core > Logic > If/Else
> 
> <span>Input:</span>{: .text-yellow-300} minCost<br>
> <span>The argument set if the action calling wants to check for a minimum cost before asjusting the user's balance. (Note there is no % cuz we are checking if the variable exists by name)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Does Not Exist
</details>

Then we want to check if the cost is below that minimum cost.
<details markdown="1">
<summary>
In the False of that If/Else (meaning the minCost does Exist) add another If/Else
</summary>

{: .subaction-title }
> Core > Logic > If/Else
> 
> <span>Input:</span>{: .text-yellow-300} %cost%<br>
> <span>The argument set that is the cost wanting to be adjusted to the user currency</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Less Than<br><br>
> <span>Value:</span>{: .text-yellow-300}%minCost%<br>
> <span>The argument set that is the minimum cost that is valid</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

<details markdown="1">
<summary>
Then In the True of that If/Else (%cost%<%minCost%) add a set argument (To let the action that called this action know we didn't actually change any currency)
</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
> 
> <span>Variable Name:</span>{: .text-yellow-300} result<br>
> <span>Name of the argument the action calling this action will use to see if the user's currency was actually adjusted</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} False
</details>

<details markdown="1">
<summary>
Then add another If/Else (To check if there is a message to show when below min cost)
</summary>

{: .subaction-title }
> Core > Logic > If/Else
> 
> <span>Input:</span>{: .text-yellow-300} minCostMessage<br>
> <span>The argument set if the action calling wants to send a message when the cost inputted is less than the min cost. Notice there is no % because we are using the Does not Exist Operation</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Does not Exist<br>
> <span>Checks if the message was given</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

Then in the False of that If/Else send the message given[<sup>3</sup>](#footnotes3)<br><br>
And finally add a Break after that If/Else since the cost was too little we don't wanna continue to adjust the currency.

### 4. Check if user has enough currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/pay_currency_check_balance.png" width="500"><br>
We need to check to see if the user has enough to pay to given cost (making it so users can't have negative currency).
<details markdown="1">
<summary>
First we need to get the user's current balance which we can do by just using the action we created above. Add a Run Action.
</summary>

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Get Balance<br>
> <span>The action we created above for getting a user's currency</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Run Action Immediately:</span>{: .text-yellow-300} Marked as On<br>
> <span>Turn this on so the action is run inline with this action sharing arguments and waits until its done before continuing</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

<details markdown="1">
<summary>
Then we need to check their balance agasint the given cost. Add an If/Else
</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %balance%<br>
> <span>The argument that is the user's current currency amount. (this is set in the Get Balance action above so the name MUST match)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Less Than<br><br>
> <span>Value:</span>{: .text-yellow-300} %cost%<br>
> <span>The argument amount we want adjust the user's currency by.</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

<details markdown="1">
<summary>
In the True of that If/Else (%balance%<%cost%) add a set argument (To let the action that called this action know we didn't actually change any currency)
</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
> 
> <span>Variable Name:</span>{: .text-yellow-300} result<br>
> <span>Name of the argument the action calling this action will use to see if the user's currency was actually adjusted</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} False
</details>

<details markdown="1">
<summary>
Then add another If/Else (To check if there is a message to show when the user doesn't have enough currency for the cost)
</summary>

{: .subaction-title }
> Core > Logic > If/Else
> 
> <span>Input:</span>{: .text-yellow-300} tooPoorMessage<br>
> <span>The argument set if the action calling wants to send a message when the cost is more than user's currency. Notice there is no % because we are using the Does not Exist Operation</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Does not Exist<br>
> <span>Checks if the message was given</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

Then in the False of that If/Else send the message given.[<sup>3</sup>](#footnotes3)<br><br>

### 5. Adjust the user's currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/pay_currency_adjust_balance.png" width="500"><br>
<details markdown="1">
<summary>
First add a Set Argument to the False of the If/Else at start of step 4 (%balance%<%cost%) (To let the action that called this action know we are actually changing the user's currency)
</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
> 
> <span>Variable Name:</span>{: .text-yellow-300} result<br>
> <span>Name of the argument the action calling this action will use to see if the user's currency was actually adjusted</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} True
</details>

<details markdown="1">
<summary>
Then add another If/Else (To check if we are adjusting the redeemer or target)
</summary>

{: .subaction-title }
> Core > Logic > If/Else
> 
> <span>Input:</span>{: .text-yellow-300} redeemer<br>
> <span>The argument set if we are adjusting the currency of the redeemer[<sup>2</sup>](#footnotes2) as opposed to the target[<sup>1</sup>](#footnotes1)</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Operation:</span>{: .text-yellow-300} Equals<br><br>
> <span>Value:</span>{: .text-yellow-300} True<br>
</details>

<details markdown="1">
<summary>
Then in the True of tha If/Else (%redeemer%==True) add a Global (Set) (To adjust the currency of the redeemer)
</summary>

{: .subaction-title }
> Core > Globals > Global (Set)
> 
> <span>Destination:</span>{: .text-yellow-300} User (Redeemer)<br>
> <span>Set to the redeemer[<sup>2</sup>](#footnotes2) of the calling action.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Persisted:</span>{: .text-yellow-300} Marked as On<br>
> <span>On so the users currency doesn't reset when streamerbot closes</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Variable Name:</span>{: .text-yellow-300} balance<br>
> <span>The name of your variable for your currency. MUST match the name you used in the Get Balance action above.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Dropdown Box:</span>{: .text-yellow-300} Decrement<br>
> <span>Set to subtract the cost from the user's currency as the default behavior.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Decrement:</span>{: .text-yellow-300} %cost%<br>
> <span>The argument that is the amount to actually adjust the user's by, set by the action calling this action.</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

<details markdown="1">
<summary>
Then Inside the False of the same If/Else add another Global (Set) (To adjust the currency of the target)
</summary>

{: .subaction-title }
> Core > Globals > Global (Set)
> 
> <span>Destination:</span>{: .text-yellow-300} User (Target)<br>
> <span>Set to the target[<sup>1</sup>](#footnotes1) of the calling action.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Persisted:</span>{: .text-yellow-300} Marked as On<br>
> <span>On so the users currency doesn't reset when streamerbot closes</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Variable Name:</span>{: .text-yellow-300} balance<br>
> <span>The name of your variable for your currency. MUST match the name you used in the Get Balance action above.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Dropdown Box:</span>{: .text-yellow-300} Decrement<br>
> <span>Set to subtract the cost from the user's currency as the default behavior.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Decrement:</span>{: .text-yellow-300} %cost%<br>
> <span>The argument that is the amount to actually adjust the user's by, set by the action calling this action.</span>{: 	.text-grey-dk-000 .fs-3 }
</details>

---

## Add Currency Command
Command & Action for actually adjusting a user's currency for use by the streamer and possibly mods.


### 1. Create Name of your Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/add_currency_global_variables.png" width="500"><br>
Create 2 Global Variables for the name of your currency for the viewers to see! Making them global variables makes it much easier if you want to rename your currency at any point.<br><br>
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

### 2. Create Command for Add Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/add_currency_command.png" width="500"><br>
<details markdown="1">
<summary>
Go to Commands and add a new command for adding currency.
</summary>

{: .subaction-title }
> Add Command
> 
> <span>Name:</span>{: .text-yellow-300} Add Currency<br>
> <span>The name of this command in streamerbot. This name is just for you and viewers won't see it.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Mode:</span>{: .text-yellow-300} Regex<br>
> <span>I recommend a regex for better command control but I will also explain how to adjust if you do normal instead</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Regex:</span>{: .text-yellow-300} ^ \*! \*(add\|give) \*(token\|money\|monie)s? \*@?(?\<target\>\S+) +(?\<amount\>(\\\+\|-)?\d{1,9})<br>
> <span>Regex for getting the command and the user to add to and amount to add. Full breakdown below.</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Explicit Capture</span>{: .text-yellow-300} Marked as On<br>
> <span>Makes the regex only capture groups we have named or numbered</span>{: 	.text-grey-dk-000 .fs-3 } <br><br>
> <span>Group</span>{: .text-yellow-300} Economy<br>
> <span>Name for group for all your economy commands to keep it better organized</span>{: .text-grey-dk-000 .fs-3 }

</details>

You can set the grant type to Deny to only allow the streamer to use the command or you can set it to Allow and add Moderators so only Mods and the streamer can use the command.
<details markdown="1" id="add_currency_regex">
<summary>
The Regular Expression Breakdown (And what to change for your currency name)
</summary>

{: .subaction-title }
> ^ \*! \*(add\|give) \*(token\|money\|monie)s? \*@?(?\<target\>\S+) +(?\<amount\>(\\\+\|-)?\d{1,9})
> 
> <span>^ \*! \*</span>{: .text-yellow-300}<br>
> <span>Start the command with a ! with any number of spaces before and after it.</span>{: .text-grey-dk-000 .fs-3 } <br><br>
> <span>(add\|give) *</span>{: .text-yellow-300}<br>
> <span>add or give text to start the command with any number of spaces after it</span>{: .text-grey-dk-000 .fs-3 } <br><br>
> <span>(token\|money\|monie)</span>{: .text-yellow-300}<br>
> <span>CHANGE THIS! The possible names for the currency. default is token or money or monie. put any you want all seperated by a \|. (i.e. (coin\|gold) or (cash) or (blood\|drop|blooddrop))</span>{: .text-grey-dk-000 .fs-3 } <br><br>
> <span>s? \*</span>{: .text-yellow-300}<br>
> <span>Allow an s after the currency name and any number of spaces</span>{: .text-grey-dk-000 .fs-3 } <br><br>
> <span>@?(?\<target\>\S+) +</span>{: .text-yellow-300}<br>
> <span>Captures any number of non-whitespace characters followed by one or more spaces not including a single leading @ if any. (aka, the user being targeted).</span>{: .text-grey-dk-000 .fs-3 } <br><br>
> <span>(?\<amount\>(\\\+\|-)?\d{1,9})</span>{: .text-yellow-300}<br>
> <span>Captures 1 to 9 number digits that can have a +, -, or nothing in from of it. (aka the amount to add)</span>{: .text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>
Example Regular expressions
</summary>


{: .subaction-title }
> Example Regex
> 
> <span>^ \*! \*(add\|give) \*(coin\|gold)s? \*@?(?\<target\>\S+) +(?\<amount\>(\\\+\|-)?\d{1,9})</span>{: .text-yellow-300}<br>
> <span>Matches !addcoins @KitzyAngel 100 or !givegold @BatzyKitty -10 or !givecoin @Onion 10</span>{: .text-grey-dk-000 .fs-3 } <br><br>
> <span>^ \*! \*(add\|give) \*(token\|money\|monie)s? \*@?(?\<target\>\S+) +(?\<amount\>(\\\+\|-)?\d{1,9})</span>{: .text-yellow-300}<br>
> <span>Matches !addtokens @KitzyAngel 100 or !givemonies @BatzyKitty -10 or !addtoken @Onion 10</span>{: .text-grey-dk-000 .fs-3 } <br><br>
> <span>^ \*! \*(add\|give) \*(cash) \*@?(?\<target\>\S+) +(?\<amount\>(\\\+\|-)?\d{1,9})</span>{: .text-yellow-300}<br>
> <span>Matches !addcash @KitzyAngel 100 or !givecash @BatzyKitty -10 or !addcash @Onion 10</span>{: .text-grey-dk-000 .fs-3 } <br><br>
> <span>^ \*! \*(add\|give) \*(cash)s? \*@?(?\<target\>\S+) +(?\<amount\>(\\\+\|-)?\d{1,9})</span>{: .text-yellow-300}<br>
> <span>Matches !addcash @KitzyAngel 100 or !givecash @BatzyKitty -10 or !addcash @Onion 10</span>{: .text-grey-dk-000 .fs-3 }

</details>

### 3. Create Action for Add Currency Command
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/add_currency_add_action.png" width="500"><br>
<details markdown="1">
<summary>
Add a new Action for the add currency command
</summary>

{: .subaction-title }
> Add Action
> 
> <span>Name</span>{: .text-yellow-300} Add Currency<br>
> <span>Name of the action can be whatever you want.</span>{: .text-grey-dk-000 .fs-3 } <br><br>
> <span>Group</span>{: .text-yellow-300} Economy<br>
> <span>Name of the group the action is in can be whatever you want but I recommend the same group you have put the other 2 actions so far in.</span>{: .text-grey-dk-000 .fs-3 }

</details>

Add Trigger to the action of the command created in step 2 through Core > Commands > Command Triggered

### 4. Check if a valid user was given
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/add_currency_check_user.png" width="500"><br>
<details markdown="1">
<summary>
Get the user for the target of the command. (I use Sub-Action Twitch -> User -> Get User Info For Target for a Twitch command but any Get User Info Sub-action should work)[<sup>4</sup>](#footnotes4)
</summary>

{: .subaction-title }
> Twitch/Kick > User > Get User Info for Target
> 
> <span>User Login:</span>{: .text-yellow-300} %target%<br>
> <span>If you use the regex from about the variable will be %target% for the name of the capture group. If you use a normal command then the variable will be %input0% for the first input in the command.</span>{: .text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>
Then add an If/Else to check if they exist.
</summary>

{: .subaction-title }
> Core > Logic > If/Else
> 
> <span>Input:</span>{: .text-yellow-300} %addTargetResult%<br>
> <span>The variable given by Get User Info for Target that is true if a user was found</span>{: .text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation:</span>{: .text-yellow-300} Equals<br><br>
> <span>Value:</span>{: .text-yellow-300} True

</details>

Then in the false send a message[<sup>3</sup>](#footnotes3) that the user was not found if you want and Add a Break to stop since you can't add currency to an invalid user.

### 5. Add the currency to the user
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/add_currency_add_amount.png" width="500"><br>
<details markdown="1">
<summary>
Set Argument for the amount to add
</summary>

{: .subaction-title }
> Core > Arguments > Set Argument 
> 
> <span>Variable Name:</span>{: .text-yellow-300} cost<br>
> <span>The name of the argument to be used by the pay currency action. this MUST match the variable used in that action above.</span>{: .text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} $math(-1\*%amount%)$<br>
> <span>The amount given times -1 so it adds it instead of subtraction with the pay currency action. (If you used the regex above it will be %amount% but if you want to use a normal command it should be %input1% for the 2nd input in the command)</span>{: .text-grey-dk-000 .fs-3 }

</details>
<details markdown="1">
<summary>
(OPTIONAL) If you have a normal command instead of Regex then you could get a not valid number so you can add a message for it that happens by adding this set argument
</summary>

{: .subaction-title }
> Core > Arguments > Set Argument 
> 
> <span>Variable Name:</span>{: .text-yellow-300} NaNMessage<br>
> <span>The name of the argument to be used by the pay currency action. this MUST match the variable used in that action above.</span>{: .text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} %input1% is not a valid number :(<br>
> <span>The message to send if an invalid number was inputted</span>{: .text-grey-dk-000 .fs-3 }

</details>
<details markdown="1">
<summary>
Then finally run the action you made above (Pay Currency) to actually adjust the user's currency.
</summary>

{: .subaction-title }
> Core > Actions > Run Action 
> 
> <span>Action:</span>{: .text-yellow-300} Pay Currency<br>
> <span>The action you created above to adjust a user's currency.</span>{: .text-grey-dk-000 .fs-3 }<br><br>
> <span>Run Action Immediately:</span>{: .text-yellow-300} Marked as On<br>
> <span>Run the action inline so it waits for completeion and gets the arguments from it</span>{: .text-grey-dk-000 .fs-3 }

</details>

### 6. Send Response Message
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/add_currency_response_message.png" width="500"><br>
<details markdown="1">
<summary>
First make sure it actually added the currency by adding an If/Else.
</summary>

{: .subaction-title }
> Core > Logic > If/Else
> 
> <span>Input:</span>{: .text-yellow-300} %result%<br>
> <span>The variable given by Pay Currency that is if it succeded or not. MUST be the same as the name in the action above.</span>{: .text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation:</span>{: .text-yellow-300} Equals<br><br>
> <span>Value:</span>{: .text-yellow-300} True

</details>

Then in the True send a message[<sup>3</sup>](#footnotes3) that it succeded with any info you may want. Below is an example message and how to get all the parts.

### 7. (OPTIONAL) Get more info for sending message
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/add_currency_full_response_message.png" width="500"><br>

<details markdown="1">
<summary>
First lets grab the new balance of the user by running our Get Balance Action
</summary>

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Get Balance<br>
> <span>The action we created above for getting a user's currency</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Run Action Immediately:</span>{: .text-yellow-300} Marked as On<br>
> <span>Turn this on so the action is run inline with this action sharing arguments and waits until its done before continuing</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>
Then Lets figure out if the new balance is singular or plural with an If/Else, and set an argument to the correct word for use later.
</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %balance%<br>
> <span>The new balance of the user</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} 1

#### True (aka Singular)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} newCurrencyName<br>
> <span>Unquie name for the word to use for the user's current balance.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} ~currencyName~<br>
> <span>The global variable set to the singular name of your currency</span>{: 	.text-grey-dk-000 .fs-3 }

#### False (aka Plural)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} newCurrencyName<br>
> <span>Unquie name for the word to use for the user's current balance.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} ~currencyNamePlural~<br>
> <span>The global variable set to the plural name of your currency</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>
Then Lets repeat that but for the amount being added to find out if its plural or singular and store it.
</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %amount%<br>
> <span>The amount being added to the user's currency</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} 1

#### True (aka Singular)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} currencyName<br>
> <span>Unquie name for the word to use for the amount being added.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} ~currencyName~<br>
> <span>The global variable set to the singular name of your currency</span>{: 	.text-grey-dk-000 .fs-3 }

#### False (aka Plural)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} currencyName<br>
> <span>Unquie name for the word to use for the amount being added.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} ~currencyNamePlural~<br>
> <span>The global variable set to the plural name of your currency</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>
Next get the user's pronouns and set an argument for if they use has/have (since it doesn't store that one automatically).
</summary>

{: .subaction-title }
> Integrations > Pronouns > Add Pronouns for User
>
> <span>User Login:</span>{: .text-yellow-300} %target%<br>
> <span>The user being targeted by the command. If you did a normal command instead of regex this should be %input0% for the first input of the command</span>{: 	.text-grey-dk-000 .fs-3 }

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %pronounCurrentTenseLower%<br>
> <span>Variable that stores if the user's pronouns use 'are' or 'is'.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} are<br>
> <span>Check agasint 'are' because if they use 'are' then they use 'have' and if not they use 'has'</span>{: 	.text-grey-dk-000 .fs-3 }

#### True (aka uses 'are')
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} pronounHas<br>
> <span>Unquie name for the word to use of has/have.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} have

#### False (aka uses 'is')
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} pronounHas<br>
> <span>Unquie name for the word to use of has/have.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} has

</details>

<details markdown="1">
<summary>
Then a message you could send with all of the above would be:
</summary>

{: .subaction }
> %target% got %amount% %currencyName%! %pronounSubject% now %pronounHas% %balance% %newCurrencyName%!

which could result in this for example:

{: .subaction }
> KitzyAngel got 10 tokens! She now has 145 tokens!

</details>

---

## Add Show Balance Command
Command & Action for a user to see their own amount of currency

### 1. Create Command for Showing currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/show_balance_command.png" width="500"><br>

<details markdown="1">
<summary>
First go to Commands and Add a new command for showing a user's amount of currency.
</summary>

{: .subaction-title }
> Add Command
>
> <span>Name:</span>{: .text-yellow-300} Balance<br>
> <span>The name of the command. This is for you only</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Mode</span>{: .text-yellow-300} Normal<br>
> <span>Since this is a very simple command there is no benefit to Regex</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Command(s)</span>{: .text-yellow-300} !balance<br>
> <span>Commands you want users to type in to see their current currency</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group</span>{: .text-yellow-300} Economy<br>
> <span>Name of group the command is in. I recommend putting it in the same group as your other economy commands</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Grant Type</span>{: .text-yellow-300} Allow<br>
> <span>Who can use this command. Since it only affects themselves you can let anyone use it without risk.</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 2. Create Action for Show Currency command
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/show_balance_action.png" width="500"><br>

<details markdown="1">
<summary>
Next go to Actions and Add a new action for the above command
</summary>

{: .subaction-title }
> Add Action
>
> <span>Name:</span>{: .text-yellow-300} Show Balance<br>
> <span>The name of the action. This is for you only</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Group</span>{: .text-yellow-300} Economy<br>
> <span>Name of group the action is in. I recommend putting it in the same group as your other economy actions</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

Then Also add a Trigger to this action Core > Commands > Command Triggered for the command created in Step 1.

### 3. Get the balance of the redeemer
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/show_balance_get_balance.png" width="500"><br>

<details markdown="1">
<summary>
Just set an argument for the Get Balance action you created above to grab from the redeemer
</summary>

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} redeemer<br>
> <span>The name of the argument to let the Get Balance Action created above know you want the redeemer's currency. MUST match what you had above.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value</span>{: .text-yellow-300} True

</details>

<details markdown="1">
<summary>
Then simply run the Get Balance Action created above to get their amount of currency,
</summary>

{: .subaction-title }
> Core > Actions > Run Action
>
> <span>Action:</span>{: .text-yellow-300} Get Balance<br>
> <span>The name of the action created above to get the amount of currency a user has.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Run Action Immediately</span>{: .text-yellow-300} Marked As On<br>
> <span>Marked on to run inline and wait until down getting the arguments from it</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

### 4. Send message with the user's currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/show_balance_send_balance.png" width="500"><br>
Send a message[<sup>3</sup>](#footnotes4) to whatever platform you want with the balance you got in step 4.

<details markdown="1">
<summary>
For an example first get if the balance is singular or plural by adding an If/Else
</summary>

{: .subaction-title }
> Core > Logic > If/Else
>
> <span>Input:</span>{: .text-yellow-300} %balance%<br>
> <span>The new balance of the user</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Operation</span>{: .text-yellow-300} Equals<br><br>
> <span>Value</span>{: .text-yellow-300} 1

#### True (aka Singular)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} currencyName<br>
> <span>Unquie name for the word to use for the user's current balance.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} ~currencyName~<br>
> <span>The global variable set to the singular name of your currency</span>{: 	.text-grey-dk-000 .fs-3 }

#### False (aka Plural)
{: .no_toc }

{: .subaction-title }
> Core > Arguments > Set Argument
>
> <span>Variable Name:</span>{: .text-yellow-300} currencyName<br>
> <span>Unquie name for the word to use for the user's current balance.</span>{: 	.text-grey-dk-000 .fs-3 }<br><br>
> <span>Value:</span>{: .text-yellow-300} ~currencyNamePlural~<br>
> <span>The global variable set to the plural name of your currency</span>{: 	.text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>
Then a message you could send with the above would be:
</summary>

{: .subaction }
> %user% has %balance% %currencyName%!

which could result in this for example:

{: .subaction }
> KitzyAngel has 1 token!

</details>


---

{: .fs-3 }
<div markdown="1">
<sup id="footnotes1">1</sup> Target is who the action using this action got using a 'Get Target User' Sub-Action<br>

<sup id="footnotes2">2</sup> Redeemer is who is using the command or other trigger of the action using this action.<br>

<sup id="footnotes3">3</sup> You can always just send a message through twitch or whatever platform you want but I use another action called Send Message Explained <a href="{{ site.baseurl }}/send_message.html" target="_blank">here</a> for compability with other extensions and platforms.<br>

<sup id="footnotes4">4</sup> Youtube doesn't have a Get User Target Info Sub-Action so it requires a tiny bit of code to rework both Pay Currency and Get Balance Actions explained [here]({{ site.baseurl }}/Economy/basics_youtube.html).
</div>

<hr style="border:1px solid gray">

# Premade Extension

## Short Video
{: .no_toc }
<iframe width="500" src="https://youtube.com/shorts/LGSfLPEAjaE"></iframe>

---

## 1. Import the extension
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/premade_import.png" width="500"><br>
Download the [extension]({{ site.baseurl }}/downloads/EconomyBasics.sb). Then click Import at the top of streamerbot and drag the file into the box. Then click Import then Ok.

## 2. Create Name of your Currency
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/add_currency_global_variables.png" width="500"><br>
Create 2 Global Variables for the name of your currency for the viewers to see! Making them global variables makes it much easier if you want to rename your currency at any point.<br><br>
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

## 3. Setup the commands
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/premade_commands.png" width="500"><br>

<details markdown="1">
<summary>
Setup command for showing balance. Edit Balance Command
</summary>

{: .subaction-title }
> Edit Command
> 
> <span>Enabled</span>{: .text-yellow-300} Marked as On<br>
> <span>Mark enabled so the command works</span>{: .text-grey-dk-000 .fs-3 }<br><br>
> <span>Commands</span>{: .text-yellow-300} !token<br>
> <span>Set to any commands you want for people to see their balance of currency. (i.e. !tokens !token & !balance if your currency is tokens or !rings !ring & !balance if its rings)</span>{: .text-grey-dk-000 .fs-3 }

</details>

<details markdown="1">
<summary>
Setup command for adding currency to users. Edit Add Currency Command
</summary>

{: .subaction-title }
> Edit Command
> 
> <span>Enabled</span>{: .text-yellow-300} Marked as On<br>
> <span>Mark enabled so the command works</span>{: .text-grey-dk-000 .fs-3 }<br><br>
> <span>Regex</span>{: .text-yellow-300} ^ \*! \*(add\|give) \*(token\|money\|monie)s? \*@?(?\<target\>\S+) +(?\<amount\>(\+\|-)?\d{1,9})<br>
> <span>Change the (token\|money\|monie) part in the parenthese to any words for your currency all seprated by \| like in the default. If you want more of an expliation and/or full breakdown check [up here](#2-create-command-for-add-currency)</span>{: .text-grey-dk-000 .fs-3 }

</details>


## 4. (OPTIONAL) Change messages
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/premade_messages.png" width="500"><br>
Look for blue comments that start with "\/ Message" for places for messages to change. This extension has these ones:<br>
* Message showing user's balance for Balance Command (in Show Balance Action)
* Message for when Add Currency command is given an invalid user (in Add Currency)
* Message for when Add Currency adjusts a users currency (in Add Currency)
* Message for if an invalid number was put into the Add Currency Command (in Add Currency, only if using normal instead of regex for Add Currency Command)

## 5. (OPTIONAL) Change to another platform than twitch
{: .no_toc }
<img src="{{ site.baseurl }}/img/Economy/basics/premade_add_currency.png" width="500"><br>
The Add Currency Action gets Twitch User info so you could replace that with Kick (The very first sub-action), look [here]({{ site.baseurl }}/Economy/basics_youtube.html) to see how to make it work for youtube, or get a little more complicated and make it work for multiple <3<br><br>
<img src="{{ site.baseurl }}/img/Economy/basics/premade_send_message.png" width="500"><br>
Also The send message action is very basic and can easily be changed to send to another platform, look [here]({{ site.baseurl }}/send_message.html)<br>