Copyright 2019 Geometry OU / Kiwi Browser
Licensed under https://creativecommons.org/licenses/by-nc-sa/4.0/


*This is a fork of the New Tab Page from Kiwi Browser, open-source and free to use in non-commercial projects.*

# New Tab Page
The  original ntp  was made up of two part:
 - A list of most visited websites, ordered on a grid of tiles
 - A list of recent news

This fork has removed the two parts and created a "modular" ones that we can call widgets:
- Search Bar
- Quick Links
- Bookmarks Grid
- News Section
- Tabs Widgets
and more can be added in the future..

The main goal is to provide all the options to customize anything.
Settings are stored in a local cache (localStorage.ntp_sett).

Once the page is loaded, the pre-rendered version of all enabled widgets is instantly displayed on screen 

Some widget have limited functionality ( like access the most visited pages,history,downloaded files etc.)
Fully widgets working/support is gradually implemented into Kiwi Browser.

Favicons are retrieved from 
- Kiwi Browser's server (https://logos.kiwibrowser.com/cnn.com - No analytics, no logs, no identifier to send).
- or user can add custom links for favicons

For security reasons, the new tab page should only establish connection to HTTPS servers.
CORS (loading requests from remote servers), XHR and CSP policies can be adapted if you need, feel free to ask on Discord (or open an issue).


You can directly try this fork of the new tab page online by going with your favorite browser (Chrome or Kiwi Browser) on https://d3ward.github.io/ntp/local_ntp.html 
Original one - https://kiwibrowser.github.io/ntp/local_ntp.html 

*__Made with <3 for Kiwi Browser__*

