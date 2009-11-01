var includeList = [];
function include(f) {if (includeList[f]) return;var s=includeList[f]='<scr'+'ipt type="text/javascript" src="' + f + '"></scr'+'ipt>';document.write(s);}

include("emulator/lib/Emulator.js");
include("emulator/lib/Init.js");