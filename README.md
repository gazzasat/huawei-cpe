# huawei-cpe
Utilities for various Huawei branded routers. 

The primary aim of this utility is to enable the configuration of the Huawei H112-370 5G CPE Pro family routers using the API for functions that have been hidden or omitted on some versions of the Web UI firmware running on the device.

This has been developed and tested so far on an unlocked (ex Three network) Huawei H112-370 5G CPE Pro 

There are some totally useful features which were omitted by many of the branded router firmwares for various carriers - 
1) controlling the 4G band selection which while not able to lock to a fixed tower of choice, does allow you to select a subset of the 4G bands available to use which can be useful in filtering out stronger bands from non 5G ENDC enabled masts. Updated infrastructure sites generally feature first sight of bands such as B28 and B32 and so you can effectively lock to only that tower to ensure 5G NSA handoff...
2) configuring a custom DNS primary and secondary servers to override the default (slow and filtered) ones provided by the carrier

The basic method was inspired by similar utility code and tutorial walk-throughs shared by Mionno via his excellent Youtube channel : https://www.youtube.com/c/MioNonno/videos

Credit to his work!
