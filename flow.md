# Flow

## Header

- [V] Add the Grix logo (similar to Moby, including the word "Grix") @Tomelia1999
- [V] New header order: Trade, Portfolio, Points, More (dropdown includes: Grix API, Calypso,options matrix, Swap, Trading Statistics, Docs) @yadin + @yan
- [V] Disable the "Trade" animation when the user is already on the trade page @Tomelia1999
- [V] Change the logo sizes, smaller on desktop and bigger on mobile

## Main Trade Page

- [V] Adjust size to fit Mac 13" screen (so a user sees all the component including the lower part) @Tomelia1999
- [V] Remove "Buy/Sell" and "Vanilla/0dte" options line @asalef10
- [V] Default setting: show all protocols. Change the text in the toggle button to "Show only options tradable on Grix." When clicked, change the text to "Show all options." @Tomelia1999
- [V] Do not display the PnL chart unless the user clicks on its icon (default should show all protocols) @Tomelia1999
- [V] Fix the PnL chart so it updates correctly when the user exits or changes  @yan
- [V] Remove the "best" tag @Tomelia1999
- [V] Mute (less bright) all colors except the Buy button (including liquidity notices, framework, upper buttons, etc.)
- [V] Fix the bug where the Buy button does not appear when the filter is off @Tomelia1999
- [V] CTA blue button only for "available on Grix" positions @Tomelia1999
- [V] selected strike should be the strike with the most protocols available at that expiry @Tomelia1999
- [V] Buy button should be visible on the trade page if there is at least 1 protocol available to trade at that expiry @Tomelia1999
- [V] Toggle btn logic is reversed @Tomelia1999

## Review Order Component

- [V] Change "Option Protocol" to “Protocol.” @asalef10
- [V] Change "Option Size" to “Size” with the unit displayed as “contracts”. @asalef10
- [V] Move "Available" to the right side and --Need implement change font style + add-- [] @asalef10
- [V] Change “Points” to “Grix Points.” @asalef10
- [v] Add muted-color logos for payment methods: WETH, WBTC, USDC. @asalef10
- [V] Default payment method: USDC, displayed with its logo. @asalef10

  - [V] Add “You Pay” @yadin
  - [V] Center the input component. Units should match the chosen payment method, with a muted $ value displayed next to it. @asalef10
  - [V] Show the "Balance" from the user’s wallet and include a “Max” button. @asalef10
  - [V] Consider adding the buy button to the right side (not a must)This is how it should look like: @asalef10

- [V] Add the white Grix logo with the text "GRIX" next to the "Powered by Grix" section. @yadin
- [V] Display the payment amount (in the chosen method) directly on the Buy button. @asalef10

## Order Flow

- [V] Important: After clicking the Buy button:
  - [V] Change "Order in progress" to "Intent submitted."
  - [V] Add a "Track progress" CTA. @asalef10
  - [V] Include a small animation showing the +Points number at the top of the message (gamified) immediately after the user clicks Buy.@asalef10
- [V] On clicking the "Track progress" CTA, display a pop-up with the text:"Intent submitted to Grix's solvers network. Your order is now in the queue. Track its progress on the portfolio page."Include a [View Portfolio CTA]. @asalef10

- [V] Pop-ups should appear one after the other, or merged into 1 popup it doesn't really matter. (gamified points first, then the intent confirmation) and stay live for at least 10 seconds. @asalef10

## Portfolio Page

- [v] Under Positions Change ”Open" to "Active" @yadin
  - [V] Display transaction time not just the date @4tal
  - [V] Make the live PnL numbers update every second with animated number effects. (Potential big issue) @asalef10
- [ ] Change Orders categories to "In Progress" and "History" @Tomelia1999
  - [Ask Or] Inside "History," there are two categories: Failed and Succeeded. @Tomelia1999
  - [ ] Consider: For Failed orders to subcategories that show error types. Can also display it when a user hovers on the ‘failed’ tag. @Tomelia1999
  - [ ] Refund - If an ordered is failed and the refund has not arrived yet - write “refund in progress” and add an explanation in a hover tooltip like “The order has failed due to ….[error] refund is in progress” or something more technical. Point is to show the user that there is a reason his funds are not in the wallet and the transaction failed. You can also state how long it will take to refund if that is possible @Tomelia1999

## General

- [V] Smaller logo @asalef10
- [V] Change default toggle (Tom knows what to do) @Tomelia1999
- [V] Change default filter @Tomelia1999
- [V] Fix the PnL chart so it updates correctly when the user exits or changes options
- [V] Less bright AI framework @asalef10

## Mobile UI (Target Audience: Researchers, Investors, First Timers)

- [V] Add a menu button:
  - [V] Header layout: Grix logo on the left, Trade next to it, Menu on the Menu (includes all other options, including Trade). It’s simple but ensures usability. @4tal
- [V] Adjust proportions so the main trade component is fixed and doesn’t move left or right. @Tomelia1999
- [V] Consider: fitting Calypso for mobile views: @4tal
  - [V] The image should appear larger and more prominent at the top @4tal
  - [V] Improvements here could take time, so assess the effort versus benefit.
- [V] Grix logo overrides the bottom line of the header. @Tomelia1999
- [V] Align the header logo and menu to the same line as the rest of the page
- [V] Push the logo to the left side of the screen and the menu to the right side of the screen
- [V] Bug - add arrow + connect the dropdown to "more" button on the mobile menu
- [V] Remove the fixed footer @asalef10
- [V] Squeeze all components so a user can see most/all options quotes before scrolling
- [ ] Can't scroll to the bottom of the page @Tomelia1999

Note: This should cover about 80-90% of the vision. Expect 5-10 minor tweaks as we iterate and refine the design together during implementation. Let’s finalize this and move forward!
