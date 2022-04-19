# huawei-cpe
Utilities for various Huawei branded routers. 

The primary aim of this utility is to enable the configuration of the Huawei H112-370 5G CPE Pro family routers using the API for functions that have been hidden or omitted on some versions of the Web UI firmware running on the device.

This has been developed and tested so far on an unlocked (ex Three network) Huawei H112-370 5G CPE Pro 

There are some totally useful features which were omitted by many of the branded router firmwares for various carriers - 
1) controlling the 4G band selection which while not able to lock to a fixed tower of choice, does allow you to select a subset of the 4G bands available to use which can be useful in filtering out stronger bands from non 5G ENDC enabled masts. Updated infrastructure sites generally feature first sight of bands such as B28 and B32 and so you can effectively lock to only that tower to ensure 5G NSA handoff...
2) configuring a custom DNS primary and secondary servers to override the default (slow and filtered) ones provided by the carrier
3) collecting many useful stats, signal parameters and cell info into one view and continually updating the data values live

The basic method was inspired by similar utility code and tutorial walk-throughs shared by MioNonno via his excellent Youtube channel : https://www.youtube.com/c/MioNonno/videos

Credit to his work!

**How to use**
==========
It works by injecting the javascript utility code into the page source code of the router web UI.

Steps:
1) Log in to the router web console (192.168.8.1) as normal using your admin user credentials
2) Using Chrome you can launch the developer console (F12) to view the page source copy-paste text content ( contents of **src/huawei-bands-util.js**) and run the script interactively (I have WiFi disabled by the way..)
![chrome-dev-console](https://user-images.githubusercontent.com/104030357/164085212-4d6afb31-a56f-4af4-b0b4-05fc0223f31c.png)
3) An alternative method is to create a new bookmark which contains the raw script as URL

An example view is as below ( SMARTY 5G SIM on Three Phase 8 monopole filtered by bands to use B20,B28 & B32):
![util-screenshot](https://user-images.githubusercontent.com/104030357/164083686-494e6751-1462-422d-9b0f-6003775c0b58.png)

To select the 4G bands to use use the BANDS button:
![cpe-pro-set-4gbands](https://user-images.githubusercontent.com/104030357/164086773-98bb24bc-9699-4068-b667-c4d7b48e1810.png)

To set the custom DNS servers:
![cpe-pro-set-custom-dns](https://user-images.githubusercontent.com/104030357/164087710-40f825af-ecb4-4595-8225-e0436e2467ac.png)

Enjoy!
Gazzasat
