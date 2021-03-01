# About

## TL;DR
**What:** Random imgur image finder\
**When:** January 2021\
**Why:** Personal amusement\
**How:** ES6, HTML5, CSS3\
**Development time (approx.):** <2 hours

## Longform
A site written in **ECMAScript 6** that brute forces **random imgur URLs** to find new images that are available publicly. 

The script does **not** block NSFW images, so some found images **may** be inappropriate or disturbing. 

The script has **two** operating modes; 
- one where the **first** found image is displayed **immediately** to the user,
- and another where it **continuously harvests** valid images, and composes a **list** of links for the user.

The user can also adjust the **length** of the URL in number of characters. **5** will be the **fastest** but will typically return **old** images, while **7** will return newer ones but extremely **slowly**.

The script and UI were written in less than **2 hours**, and the styling could certainly be **improved**. The only API used is fetch, but that is **extensively supported** and not third-party.
