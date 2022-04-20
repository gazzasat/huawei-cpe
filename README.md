# huawei-cpe
Utilities for various Huawei branded routers. 

The primary aim of this utility is to enable the configuration of the Huawei H112-370 5G CPE Pro family routers using the API for functions that have been hidden or omitted on some versions of the Web UI firmware running on the device.

This has been developed and tested on an unlocked (ex Three network) Huawei H112-370 5G CPE Pro :
|        Param         |         Value              |
| -------------------- | -------------------------- |
|  Hardware version    | WL1H112M                   |
|  Software version    | 10.0.3.1(H330SP60C21)      |
|  Web UI version      | WEBUI 10.0.3.1(W2SP60C21)  |
|  Config file version | H112-370-CUST 8.0.1.3(C21) |

The script should hopefully work on other Huawei router devices such as B525 but some data and features may not be relevant. **Be prepared to do a factory reset** (hard reset using reset button on unit) to recover if it doesn't do what you expect... **Use it at your own risk!**

There are some totally useful features which were omitted by many of the branded router firmwares for various carriers - 
1) controlling the 4G band selection which while not able to lock to a fixed tower of choice, does allow you to select a subset of the 4G bands available to use which can be useful in filtering out stronger bands from non 5G ENDC enabled masts. Updated infrastructure sites generally feature first sight of bands such as B28 and B32 and so you can effectively lock to only that tower to ensure 5G NSA handoff...
2) configuring a custom DNS primary and secondary servers to override the default (slow and filtered) ones provided by the carrier
3) collecting many useful stats, signal parameters and cell info into one view and continually updating the data values live

The basic method was inspired by similar utility code and tutorial walk-throughs shared by MioNonno via his excellent Youtube channel : https://www.youtube.com/c/MioNonno/videos

Credit to his work!

How to use
==========
It works by injecting the javascript utility code into the page source code of the router web UI.

Steps:
1) Log in to the router web console (192.168.8.1) as normal using your admin user credentials
2) Using Chrome you can launch the developer console (F12) to view the page source copy-paste text content ( contents of **src/huawei-bands-util.js**) and run the script interactively (I have WiFi disabled by the way..)
![chrome-dev-console](https://user-images.githubusercontent.com/104030357/164085212-4d6afb31-a56f-4af4-b0b4-05fc0223f31c.png)
3) An alternative method is to create a new bookmark which contains the raw script as URL

What does it look like:
=======================
An example view is as below snapshot from a (UK MVNO) SMARTY 5G SIM test with the CPE Pro on a new Three network Phase 8 'Pole of Wonder' . The 4G is filtered by bands to use B20,B28 & B32 in this setting. The ENDC anchor is only available on this mast plus it is the only one in the immediate area which features B28 and B20 as well as B32 (CA with B20 for downlink only).:

![util-screenshot](https://user-images.githubusercontent.com/104030357/164083686-494e6751-1462-422d-9b0f-6003775c0b58.png)

Without this band selection the CPE hops around between other closer proximity masts operating on B1 and or B3 which don't yet carry the 5G ENDC director anchor and hence it drops back to (slower) 4G mode frequemntly based on signal strength. You can see that the NSA main band it has locked-on is B28 which acts as the 4G anchor with 5G ENDC handoff as we only have NSA (non standalone) implementations of 5G infrastructure in the UK currently.

Selecting the bands to use is totally useful to influence the way that the router behaves so it is more predictable.

Selecting the 4G Bands:
=======================
To select the 4G bands to use use the BANDS button:

![cpe-pro-set-4gbands](https://user-images.githubusercontent.com/104030357/164086773-98bb24bc-9699-4068-b667-c4d7b48e1810.png)

Setting the DNS servers:
=======================

To set the custom DNS servers ( these are the Cloudflare ones ):
![cpe-pro-set-custom-dns](https://user-images.githubusercontent.com/104030357/164087710-40f825af-ecb4-4595-8225-e0436e2467ac.png)

What Next?:
=======================
This is a work in progress and under development.  On my unlocked H112-370 device the APN and SIM Profiles menus are not present which means that whilst the CPE router will accept and work with other provider SIMs like EE, it will select the APN automatically and does not give you the the option to change or modify the settings for the APN.

On boxes which are straight from the factory unlocked then there are menus to add new profiles, change the default selection and API calls behind the scenes that make this happen.  I am trying to figure out this stuff but need more info...

Enjoy!
Gazzasat
