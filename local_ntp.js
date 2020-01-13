if (window.chrome.embeddedSearch.newTabPage.isIncognito) {
  document.getElementById('incognito').style.display = 'inline';
  document.getElementById('ntp_cnt').style.display = 'none';
  ntp_bdy.classList.remove("op");
} else {
  var ntp_ver = "4.0.1";
  console.log("NTP Version"+ntp_ver);
  var orderListChanged = 0;
  document.getElementById("sett_mtc").style.background = localStorage.ntp_mtc;
  function save_ntpbdy() {
    try {
      localStorage.ntp_bdy = ntp_bdy.getAttribute("style");
    } catch (err) {
      showBox("Something gone wrong ! Info _:" + err.message);
    }
  }
  //Check ntp_ver and show changelog
  if (localStorage.ntp_ver != ntp_ver || !localStorage.ntp_ver) {
    localStorage.ntp_ver = ntp_ver;
    showBox("<b> New update - " + ntp_ver + "</b><br><br> - Possible fix for tile ordering <br>"+
     "- Added Code fixer tool, this will help user to solve some bugs that i can't fix with update <br> "+
     "- General code improvements ");
  }
  //Function to get default widgets
  function f_dwdg(i) {
    var chd;
    switch (i) {
      case 0:
        chd = '<div id="sb_r"><img id="sb_logo" src=""/>' +
          '<input name="sb_input" type="text" id="sb_input" size="50" spellcheck="false" onkeydown="handleKeyPress(event)"></div>'
        break;
      case 1:
        chd = '<div id="tlg"> <div class="tlg_item folder"> <div class="tlg_img tlg_fld"></div><span id="tlg_span" class="tlg_title">Folder</span></a> </div><div class="tlg_item"> <a id="tile_target" class="tile_target" href="https://kiwibrowser.com"> <img class="tlg_img" src="https://logos.kiwibrowser.com/kiwibrowser.com"onerror="f_iimg(this)"> <span id="tlg_span" class="tlg_title">Kiwi Browser</span> </a> </div></div>';
        break;
      case 2:
        chd = '<div class="wth"><div id="wth_s" onclick="func_dlg_st(1);func_st_page(6);"><i class="far fa-cog"></i> Open Weather Settings</div><div id="wth_top"><div id="wth_i"></div><div id="wth_t"></div><div id="wth_d"><div id="wth_mm"></div><div id="wth_w"></div><div id="wth_h"></div></div><br style="clear: left;" />' +
          '<div id="wth_d1"></div></div><div id="wth_btm"><div id="wth_c"></div></div><div id="wth_l">Loading...</div></div>';
        break;
      case 3:
        chd = '<div id="newsT" ><select id="newsL" onchange="f_nsrl(1)"><option value="?hl=en-US&gl=US&ceid=US:en">English | United States</option></select><span onclick="f_tnv()" class="newsT_icon"><i class="fas fa-stream"></i></span><span onclick="f_nsrl(0)" class="newsT_icon"><i class="far fa-sync-alt newsT_icon"></i></span></div><div id="newsS"><div id="news"></div><div id="newsMore"></div></div>';
        break;
      case 4:
        chd = '<div class="tbw"><ul class="tbw_ul">' +
          '<li><input type="radio" id="tab1" class="rd_tab" name="tabs"><label for="tab1" class="tbw_l"><i class="far fa-sticky-note"></i></label>' +
          '<div class="tbw_cnt"><textarea name="note" placeholder="Add some text..." id="ntarea"></textarea> </div></li>' +
          '<li><input type="radio" id="tab2" class="rd_tab" name="tabs" checked><label for="tab2" class="tbw_l"><i class="far fa-tasks"></i></label>' +
          '<div class="tbw_cnt">' +
          '<form id="tdlform" autocomplete="off"><input id="tdlinput" placeholder="What would you like to do today?" /></form>' +
          '<ul id="tdlist"></ul></div></li>' +
          '<li><input type="radio" id="tab3" class="rd_tab" name="tabs"><label for="tab3" class="tbw_l"><i class="far fa-link"></i></label>' +
          '<div class="tbw_cnt"><form id="lkform" autocomplete="off"><input id="lkinput" placeholder="Save that link .." /></form><ul id="lklist"></ul></div></li>' +
          '</ul></div>';
        break;
    }
    return chd;
  }
  //Get cached widgets
  var ntp_wdg = localGet("ntp_wdg");
  if (ntp_wdg == undefined) {
    console.log("Create default cached widgets... ");
    ntp_wdg = [{
        name: "Search Bar",
        cached: f_dwdg(0)
      },
      {
        name: "Tiles Grid",
        cached: f_dwdg(1)
      },
      {
        name: "Weather",
        cached: f_dwdg(2)
      },
      {
        name: "News Section",
        cached: f_dwdg(3)
      },
      {
        name: "Tabs ",
        cached: f_dwdg(4),
        ntarea: ""
      },
    ];
    localStore("ntp_wdg", ntp_wdg);
  }
  //Get cached settings
  var ntp_sett = localGet("ntp_sett");
  if (ntp_sett == undefined) {
    console.log("ntp_sett is undefined , let's create default one");
    ntp_sett = { //Widgets
      order: [0, 1, 2, 3, 4],
      status: [1, 1, 1, 1, 1]
    };
    localStore("ntp_sett", ntp_sett);
  }
  //Load widgets from cache
  function load_widgets() {
    let list = document.getElementById("stt_lwo").querySelectorAll("li");
    console.log("loadW:  >>"+ntp_sett.order);
    (ntp_sett.order).forEach(function (el,index){
      let wdgn = document.getElementById("wdg_"+index);
      let status = ntp_sett.status[el];

      let c = "";
      if (status) {
        wdgn.style.display = "block";
        c = "checked";
        wdgn.innerHTML=ntp_wdg[el].cached;
      } else {
        wdgn.style.display = "none";
        wdgn.innerHTML="...";
      }
      if (orderListChanged == 0) {
        list[index].setAttribute("data-id",el);
        list[index].innerHTML= '<i class="fas fa-arrows stt_lwoh"></i><label>' + ntp_wdg[el].name + '</label><input ' +
          'class="toggle togg_li" type="checkbox" onchange="toggle_widget(' +el+ ')" ' + c + '/>';
      }
    });
  }
  //Load cached widget 
  load_widgets();
  ntp_bdy.classList.toggle("op");
  //Load settings option status and value
  for (var i = 0; i < 6; i++) {
    var a = document.getElementById("stt_opt" + i);
    var b = getComputedStyle(ntp_bdy).getPropertyValue("--o" + i);
    if (i == 2) {
      var ar = document.getElementsByClassName("tile_target");
      for (var i = 0; i < ar.length; i++) ar[i].target = b;
    }
    if (a.value == b) a.checked = true;
    else a.checked = false;
  }
  //Function to set options with toggle
  function set_option_t(t, f, i) {
    console.log("status :" + t.checked + " value : " + t.value + " if false : " + f + ", index " + i);
    var value = (t.checked) ? t.value : f;
    ntp_bdy.style.setProperty("--o" + i, value);
    if (i == 2) {
      var ar = document.getElementsByClassName("tile_target");
      for (var i = 0; i < ar.length; i++) ar[i].target = value;
      f_cache_tl();
    }
    save_ntpbdy();
  }
  function load_sb(){
    //Search Bar Settings Config
  var ntp_sb = localGet("ntp_sb");
  if (ntp_sb == undefined) {
    ntp_sb = { //SearchBar
      logo: kiwiIcon,
      sK: {
        "placeholder": "Search with commands..",
        "key": ",",
        "default": "d",
        "b": "https://bing.com/search?q=",
        "g": "https://google.com/search?q=",
        "d": "https://duckduckgo.com/?q=",
        "r": "https://www.reddit.com/search?q=",
        "y": "https://www.youtube.com/results?q="
      }
    };
    localStore("ntp_sb", ntp_sb);
  }
  const sb_len = document.getElementById("sb_len");
  var sk = ntp_sb.sK;
  var sb_len_v = "";
  for (var key in sk) {
    sb_len_v += key + ' -> ' + sk[key] + '\n';
  }
  sb_len.value = sb_len_v;
  //Function to remove multiple, leading or trailing spaces 
  function f_trim(s) {
    s = s.replace(/(^\s*)|(\s*$)/gi, "");
    s = s.replace(/[ ]{2,}/gi, " ");
    s = s.replace(/\n /, "\n");
    return s;
  }
  //Function to save search bar config
  function f_svsbc() {
    var tlen = f_trim(document.getElementById("sb_len").value)+"\n";
    var error = false;
    var lines = tlen.split('\n');
    lines.splice(-1, 1);
    lines= lines.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")});
    var sKc = {};
    for (var i = 0; i < lines.length; i++) {
      var zlen = lines[i].split("->");
      if (zlen.length != 2) {
        i = lines.length;
        error = true;
      } else {
        sKc[f_trim(zlen[0])] = f_trim(zlen[1]);
      }
    }
    error = error || !(sKc['placeholder'] && sKc['key'] && sKc['default']);
    if (error) {
      showBox("Looks like you removed important keywords like \n-placeholder\n-key\n-default\n Make sure to follow the syntax too :'k' -> 'value'");
    } else {
      ntp_sb.sK = sKc;
      localStore("ntp_sb", ntp_sb);
      f_setup_sb();
      showBox("Search Bar Config saved !");
    }
  }
  const tg_r5 = document.getElementById('tg_r5');
  var tg_r5v = parseInt(ntp_bdy.style.getPropertyValue("--v0").replace("px", ""));
  if (isNaN(tg_r5v)) {
    tg_r5v = 8;
    ntp_bdy.style.setProperty("--v0", tg_r5v + "px");
    save_ntpbdy();
  }
  tg_r5.value = tg_r5v;
  tg_r5.addEventListener("input", function () {
    tg_r5v = parseInt(tg_r5.value);
    ntp_bdy.style.setProperty("--v0", tg_r5v + "px");
    save_ntpbdy();
  });
  const tg_r7 = document.getElementById('tg_r7');
  var tg_r7v = parseInt(ntp_bdy.style.getPropertyValue("--v2").replace("px", ""));
  if (isNaN(tg_r7v)) {
    tg_r6v = 8;
    ntp_bdy.style.setProperty("--v2", tg_r6v + "px");
    save_ntpbdy();
  }
  tg_r7.value = tg_r7v;
  tg_r7.addEventListener("input", function () {
    tg_r7v = parseInt(tg_r7.value);
    ntp_bdy.style.setProperty("--v2", tg_r7v + "px");
    save_ntpbdy();
  });
  const tg_r6 = document.getElementById('tg_r6');
  var tg_r6v = parseInt(ntp_bdy.style.getPropertyValue("--v1").replace("px", ""));
  if (isNaN(tg_r6v)) {
    tg_r6v = 70;
    ntp_bdy.style.setProperty("--v1", tg_r6v + "px");
    save_ntpbdy();
  }
  tg_r7.setAttribute("max", tg_r6v / 2);
  tg_r6.value = tg_r6v;
  tg_r6.addEventListener("input", function () {
    tg_r6v = parseInt(tg_r6.value);
    ntp_bdy.style.setProperty("--v1", tg_r6v + "px");
    save_ntpbdy();
  });
  const sb_logo = document.getElementById("sb_logo");
  const sett_sblgp = document.getElementById("sb_lgp");
  const sett_sb_lgf = document.getElementById("sb_lgf");
  sett_sblgp.src = ntp_sb.logo;
  function f_sb_lg1() {
    // fetch FileList object
    var file = sett_sb_lgf.files[0]; // get a reference to the selected file
    if (file && file.type.match('image.*')) {
      var reader = new FileReader();
      reader.onload = function (e) {
        sett_sblgp.src = e.target.result;
        sb_logo.src = e.target.result;
        ntp_sb.logo = e.target.result;
        localStore("ntp_sb", ntp_sb);
      }
      reader.readAsDataURL(file);
    }
  }
  function f_sb_lg2() {
    var url = prompt("Enter url of the wallpaper . \nExample : ", "url");
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function (e) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        sett_sblgp.src = dataURL;
        sb_logo.src = dataURL;
        ntp_sb.logo = dataURL;
        localStore("ntp_sb", ntp_sb);
    };
    img.src = (url);
  }
  //End of Search Bar Settings Config

  //Search Bar Widget Config 
  if (ntp_sett.status[0]) {
    function f_cache_sb() {
      const pos = (ntp_sett.order).indexOf(0);
      ntp_wdg[0].cached = document.getElementById('wdg_' + pos).innerHTML;
      localStorage.cachedNewsUpdate = (Date.now() / 1000);
      console.log("Cache search bar");
      localStore("ntp_wdg", ntp_wdg);
    }
    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
    };

    function f_setup_sb() {
      document.getElementById("sb_input").placeholder = ntp_sb.sK["placeholder"];
      if (sb_logo.src != ntp_sb.logo) {
        sb_logo.src = ntp_sb.logo;
        f_cache_sb();
      }
    }

    function handleKeyPress(e) {
      const key = e.keyCode || e.which;
      var text = document.getElementById("sb_input").value.replaceAll("+", "%2B");
      if (key == 13) search(text);
    }

    function search(text) {
      var option = text.substr(1, text.indexOf(' ') - 1) || text.substr(1);
      var subtext = text.substr(2 + option.length);
      var sK = ntp_sb.sK;
      var def_se = sK[sK["default"]];
      var key_se = sK[option];
      if (text[0] === sK["key"]) {
        if (text.indexOf(' ') > -1 && key_se != undefined)
          window.location = key_se + subtext;
        else {
          if (key_se != undefined)
            window.location = (key_se).match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)[0];
          else
            window.location = def_se + subtext;
        }
      } else
        window.location = def_se + text;
    }
    f_setup_sb();
  } // End of Search Bar Widget Config 
  }
  load_sb();

  function load_tl(){
    //Tiles Grid Widget Config
  if (ntp_sett.status[1]) {
    var gridT, fldT;
    var timeoutVariable;
    var currentEditedTile;
    var tlg = document.getElementById("tlg");
    const p_tile = document.getElementById('p_tile');
    const i_url = document.getElementById('i_url');
    const fi_url = document.getElementById('fi_url');
    const t_ac = document.getElementById('t_ac');
    const t_url = document.getElementById('t_url');
    const t_lab = document.getElementById('t_lab');
    const ft_lab = document.getElementById('ft_lab');
    const dlg_ = document.getElementById("dlg");
    const dlg_fl = document.getElementById("dlg_fl");
    const dlg_tg = document.getElementById("dlg_tg");
    const b_save = document.getElementById('b_save');
    const b_add = document.getElementById('b_add');
    const b_save2 = document.getElementById('b_save2');
    const b_add2 = document.getElementById('b_add2');
    const lrt_fl = document.getElementById("lrt_fl");
    const fldb = document.getElementById("lrt_bfl");
    var fld_current;
    //Function to cache the tiles 
    function f_cache_tl() {
      if ((typeof localStorage.cachedGridUpdate == "undefined") || ((Date.now() / 1000) - localStorage.cachedGridUpdate) >= 0.1) {
        var pos = (ntp_sett.order).indexOf(1);
        ntp_wdg[1].cached = document.getElementById('wdg_' +pos).innerHTML;
        localStorage.cachedGridUpdate = (Date.now() / 1000);
        console.log("Cache grid tiles : " + localStorage.cachedGridUpdate);
      }
      localStore("ntp_wdg", ntp_wdg);
    }
    //Toggle lrt for new/edit tile/folder
    function f_dlg(view) {
      if (view == 0) { //New Tile
        dlg_tg.style.display = "inline";
        dlg_fl.style.display = "none";
        b_add.style.display = "inline";
        b_add2.style.display = "none";
        b_save.style.display = 'none';
      }
      if (view == 4) { //Edit Tile
        dlg_tg.style.display = "inline";
        dlg_fl.style.display = "none";
        b_add.style.display = "none";
        b_add2.style.display = "none";
        b_save.style.display = 'inline';
      }
      if (view == 2) { //New Folder
        dlg_tg.style.display = "none";
        dlg_fl.style.display = "inline";
        b_add.style.display = "none";
        b_add2.style.display = "inline";
        b_save.style.display = 'none';
      }
      if (view == 5) { //Edit Folder
        dlg_tg.style.display = "none";
        dlg_fl.style.display = "inline";
        b_add.style.display = "none";
        b_add2.style.display = "none";
        b_save.style.display = 'inline';
      }
      if (view == 1) {
        p_tile.removeAttribute('src');
        i_url.value = "";
        document.getElementById("dlg_frm").reset();
        t_ac.checked = true;
        i_url.disabled = true;
        b_add.style.display = 'inline';
        b_add2.style.display = "none";
        b_save.style.display = 'none';
      }
      //Show/Hide Dialog
      dlg_.classList.toggle("show-lrt");
      ntp_bdy.classList.toggle("sl");
      document.getElementById("flt_btn").classList.remove("open");
      document.getElementById("fb-btn").innerHTML = '<i class="fas fa-caret-up"></i>';

    }
    //Create a new folder from lrt
    function f_cnf() {
      var div = document.createElement("div");
      div.classList.add("tlg_item", "folder");
      div.innerHTML = '<div class="tlg_img tlg_fld"></div><span id="tlg_span" class="tlg_title">' + ft_lab.value + '</span>';
      tlg.appendChild(div);
      f_evl_gtiles();
      f_cache_tl();
      f_dlg(1);
    }
    function fixURL(value){
      if(value.indexOf('https://')<0 && value.indexOf('http://')<0) return "https://"+value;
      return value;
    }
    //Create a new tile from lrt
    function f_cnt() {
      var newt = {};
      newt["url"] = fixURL(t_url.value);
      var title = t_lab.value;
      if (title == "") title = get_root_domain(newt["url"]);
      newt["title"] = title;
      newt["imgSrc"] = p_tile.src;
      f_attg(newt); //Create new tile and add to grid
      f_dlg(1);
    }
    //Edit a tile/folder from grid
    function f_etfg(item) {
      currentEditedTile = item;
      var title = item.textContent;
      if (currentEditedTile.classList.contains("folder")) {
        try {
          var img = item.querySelector('.tlg-img').backgroundImage;
        } catch {}
        ft_ac.checked = false;
        fi_url.disabled = false;
        ft_lab.value = title;
        f_dlg(5);
      } else {
        var url = item.querySelector('#tile_target').href;
        var img = item.querySelector('#tile_target > img').src;
        t_ac.checked = false;
        i_url.disabled = false;
        p_tile.src = img;
        i_url.value = img;
        t_url.value = url;
        t_lab.value = title;
        f_dlg(4);
      }
    }
    //Set p_tile image from t_url
    function f_sptt(t) {
      if (i_url.disabled) {
        window.clearTimeout(timeoutVariable);
        timeoutVariable = setTimeout(function () {
          var iUrl = "https://logos.kiwibrowser.com/" + get_root_domain(t.value);
          p_tile.src = iUrl;
          i_url.value = iUrl;
        }, 1000);
      }
    }
    //Set p_tile image from i_url
    function f_spti(t) {
      window.clearTimeout(timeoutVariable);
      timeoutVariable = setTimeout(function () {
        p_tile.src = t.value;
      }, 1000);
    }
    //Toggle auto/custom mode of icon tile
    function f_sac(e, s) {
      if (s == 1) {
        if (i_url.disabled) {
          e.checked = false;
          i_url.value = "";
          i_url.disabled = false;
          i_url.select();
          i_url.focus();
        } else {
          e.checked = true;
          var iUrl = "https://logos.kiwibrowser.com/" + get_root_domain(t_url.value);
          window.clearTimeout(timeoutVariable);
          timeoutVariable = setTimeout(function () {
            p_tile.src = iUrl;
          }, 1000);
          i_url.value = iUrl;
          i_url.disabled = true;
        }
      } else {
        if (fi_url.disabled) {
          e.checked = true;
          fi_url.value = "";
          fi_url.disabled = false;
          fi_url.select();
          fi_url.focus();
        } else {
          e.checked = false;
          fi_url.disabled = true;
        }
      }
    }
    //Apply change to edited tile/folder and save
    function f_sedt() {
      var item = currentEditedTile;
      for (i = 0, len = tlg.children.length; i < len; i++)
        if (tlg.children[i] == item) index = i;
      if (!currentEditedTile.classList.contains("folder")) {
        item.querySelector('#tile_target').href = t_url.value;
        const title = t_lab.value;
        if (title == "") title = get_root_domain(newt["url"]);
        item.children[0].children[1].innerHTML = title;
        item.children[0].children[0].src = p_tile.src;
      } else {
        item.children[1].innerHTML = ft_lab.value;
      }
      f_cache_tl();
      f_dlg(1);
    }
    //Get fallback icon on preview tile src error
    function f_gfi() {
      var url = i_url.value;
      if (url[30]) p_tile.src = url + "?fallback=1";
    }
    //Replace img error src
    function f_iimg(item) {
      var parser = document.createElement('a');
      parser.href = t_url.value;
      item.src = "https://logos.kiwibrowser.com/kiwibrowser.com";
    }
    //Add a tile into the grid 
    function f_attg(item) {
      const targetBlank = getComputedStyle(ntp_bdy).getPropertyValue("--o2");
      var innerDiv = document.createElement('div');
      innerDiv.className = 'tlg_item';
      innerDiv.innerHTML =
        '<a id="tile_target" class="tile_target" href="' + item.url + '" ' + targetBlank + '>' +
        '<img class="tlg_img" src="' + item.imgSrc +
        '" onError="f_iimg(this)" /><span id="tlg_span" class="tlg_title">' +
        item.title + '</span></a>';
      tlg.appendChild(innerDiv);
      console.log(" Function f_attg -> url : " + item.url + "   |  title : " + item.title + " | img : " + item.imgSrc);
      f_evl_gtiles();
      //Save
      window.setTimeout(function () {
        f_cache_tl();
      }, 200);

    }
    //Function to open folder lrt
    function f_ofld(el) {
      fld_current = el.querySelector('.tlg_fld');
      var tls = fld_current.innerHTML;
      fldb.innerHTML = tls;
      lrt_fl.classList.toggle("show-lrt");
      ntp_bdy.classList.toggle("sl");
    }
    //Function to toggle edit mode of folder
    function f_tggl_f() {
      var state = fldT.option("disabled");
      fldT.option("disabled", !state);
      document.getElementById("fld_editA").style.display = (!state) ? 'none' : 'flex';
      if (!state) {
        fld_current.innerHTML = fldb.innerHTML;
        f_cache_tl();
      };
    }
    //Function to toggle edit mode of tiles
    function f_tggl_t() {
      var state = gridT.option("disabled");
      gridT.option("disabled", !state);
      document.getElementById("tlg_sldr").style.display = (!state) ? 'none' : 'block';
      document.getElementById("tlg_editA").style.display = (!state) ? 'none' : 'flex';
      if (!state) {
        f_cache_tl();
        save_ntpbdy();
      }
    }
    //Function to add listener on tlg_items
    function f_evl_gtiles() {
      var currentFolder = null;
      var folders = document.querySelectorAll(".folder:not(.np)");
      Array.from(folders).forEach(e => {
        e.onclick = function () {
          f_ofld(e)
        };
      });
      //To toggle edit mode on grid tiles
      document.getElementById("tlg").oncontextmenu = function (e) {
        e.preventDefault();
        f_tggl_t();
      };
      //To toggle edit mode on folder view
      document.getElementById("lrt_bfl").oncontextmenu = function (e) {
        e.preventDefault();
        f_tggl_f();
      };
      //To exit toggle mode on folder view
      lrt_fl.addEventListener('click', function (e) {
        if (e.target == this) {
          e.preventDefault();
          f_tggl_f();
        }
      });
      //Detect items hovering a folder and add to folder if dropped hover folder
      Array.from(document.querySelectorAll(".tlg_item:not(.folder)")).forEach(element => {
        element.addEventListener(mLstnr[0],
          function (evt) {
            var by = evt.touches[0].clientY;
            var bx = evt.touches[0].clientX;
            if (!gridT.option("disabled")) {
              for (let i = 0; i < folders.length; i++) {
                var a = folders[i].getBoundingClientRect();
                const t = ((a.x + a.width > bx) && (a.x < bx) && (a.y < by) && ((a.y + a.height) > by));
                if (t) {
                  folders[i].style.background = "red";
                  currentFolder = folders[i];
                } else {
                  folders[i].style.background = "none";
                }
              }
            }
          }, {
            passive: true
          });
        element.addEventListener(mLstnr[1], function (evt) {
          var by = evt.changedTouches[0].pageY;
          var bx = evt.changedTouches[0].pageX;
          if (currentFolder != null) {
            var a = currentFolder.getBoundingClientRect();
            const t = ((a.x + a.width > bx) && (a.x < bx) && (a.y < by) && ((a.y + a.height) > by));
            if (!gridT.option("disabled") && t) {
              console.log(currentFolder + " | " + element);
              currentFolder.querySelector('.tlg_fld').appendChild(element);
              currentFolder.style.background = "none";
              currentFolder = null;
              f_cache_tl();
            }
          }
        }, {
          passive: true
        });
      });
    }
    //Function to setup sliders on grid tiles
    function f_setup_sldr() {
      //Add slider options for grid tiles
      if (!document.getElementById("tlg_sldr")) {
        var div = document.createElement("div");
        div.id = "tlg_sldr";
        div.innerHTML = '<div id="sld_tg"><i class="far fa-cog"></i>   Grid Tiles Sliders</div><div id="sld_vw"><label>Number of Tiles</label><div class="vrl_wrp"><input type="range" min="0" max="8" value="50" class="slr_rng" id="tg_r1"></div>' +
          '<label>Tile Width</label><div class="vrl_wrp"><input type="range" min="30" max="200" value="50" class="slr_rng" id="tg_r2"></div>' +
          '<label>Tile Space</label><div class="vrl_wrp"><input type="range" min="0" max="100" value="50" class="slr_rng" id="tg_r3"></div>' +
          '<label>Tile Rounding</label><div class="vrl_wrp"><input type="range" min="0" max="100" value="50" class="slr_rng" id="tg_r4"></div></div>';
        tlg.parentNode.prepend(div);
      }
      const wid = ((window.innerWidth) ? window.innerWidth : screen.width) - 28; //Get the width of device 
      const tg_r1 = document.getElementById('tg_r1');
      const tg_r2 = document.getElementById('tg_r2');
      const tg_r3 = document.getElementById('tg_r3');
      const tg_r4 = document.getElementById('tg_r4');
      var ntp_tlg = {
        w: parseInt(ntp_bdy.style.getPropertyValue("--tile-w").replace("px", "")),
        m: parseInt(ntp_bdy.style.getPropertyValue("--tile-m").replace("px", "")),
        n: parseInt(ntp_bdy.style.getPropertyValue("--tile-n")),
        r: parseInt(ntp_bdy.style.getPropertyValue("--tile-r").replace("px", "")),
      };
      if (isNaN(ntp_tlg.w)) {
        ntp_tlg = {
          w: 64,
          m: 10,
          n: f_gncols(),
          r: 6
        };
        setTLG();
      }
      tg_r1.value = ntp_tlg.n;
      tg_r2.value = ntp_tlg.w;
      tg_r3.value = ntp_tlg.m;
      tg_r4.setAttribute("max", ntp_tlg.w / 2);
      tg_r4.value = ntp_tlg.r;
      tg_r1.addEventListener("input", function () {
        ntp_tlg.n = parseInt(tg_r1.value);
        set_tg_r1();
      });
      tg_r2.addEventListener("input", function () {
        ntp_tlg.w = parseInt(tg_r2.value);
        set_tg_r2();
      });
      tg_r3.addEventListener("input", function () {
        ntp_tlg.m = parseInt(tg_r3.value);
        set_tg_r3();
      });
      tg_r4.addEventListener("input", function () {
        ntp_tlg.r = parseInt(tg_r4.value);
        setTLG();
      });
      //Set values in settings
      function setTLG() {
        tg_r1.value = ntp_tlg.n;
        tg_r2.value = ntp_tlg.w;
        tg_r3.value = ntp_tlg.m;
        tg_r4.setAttribute("max", ntp_tlg.w / 2);
        tg_r4.value = ntp_tlg.r;
        ntp_bdy.style.setProperty("--tile-n", ntp_tlg.n);
        ntp_bdy.style.setProperty("--tile-w", ntp_tlg.w + 'px');
        ntp_bdy.style.setProperty("--tile-m", ntp_tlg.m + 'px');
        ntp_bdy.style.setProperty("--tile-r", ntp_tlg.r + 'px');
        save_ntpbdy();
      }
      //Function to retrieve default number of cols
      function f_gncols() {
        if (wid > 253 && wid < 337) return 3;
        else if (wid > 336 && wid < 421) return 4;
        else if (wid > 420 && wid < 510) return 5;
        else if (wid > 509 && wid < 672) return 6;
        else if (wid > 671) return 8;
        return 2;
      }

      function set_tg_r3() {
        var tCol = parseInt(ntp_tlg.n);
        var tWidth = parseInt(ntp_tlg.w);
        var tMargin = parseInt(ntp_tlg.m);
        var calc = (tCol * (tWidth + tMargin)) + 1;
        while (calc > wid) {
          tWidth -= 1;
          calc = (tCol * (tWidth + tMargin)) + 1;
        }
        ntp_tlg.n = tCol;
        ntp_tlg.w = tWidth;
        ntp_tlg.m = tMargin;
        setTLG();
      }

      function set_tg_r2() {
        var tCol = parseInt(ntp_tlg.n);
        var tWidth = parseInt(ntp_tlg.w);
        var tMargin = 10;
        var calc = (tCol * (tWidth + tMargin)) + 1;
        while (calc > wid) {
          tCol -= 1;
          calc = (tCol * (tWidth + tMargin)) + 1;
          console.log(wid + " . - " + calc)
        }
        ntp_tlg.n = tCol;
        ntp_tlg.m = tMargin;
        setTLG();
      }

      function set_tg_r1() {
        var nCol = parseInt(ntp_tlg.n),
          tWidth = parseInt(ntp_tlg.w),
          tMargin = parseInt(ntp_tlg.m);
        var calc = (nCol * (tWidth + tMargin)) + 1;
        while (calc > wid) {
          calc = (nCol * (tWidth + tMargin)) + 1;
          if (tMargin > 10) tMargin -= 1;
          else tWidth -= 1;
        }
        ntp_tlg.n = nCol;
        ntp_tlg.m = tMargin;
        ntp_tlg.w = tWidth;
        setTLG();
      }
    }

    //Function to exit from editemode
    function process_body_click(e) {

      if (e.target == document.getElementById("sld_tg")) {
        document.getElementById("sld_vw").classList.toggle("open_sld");
        e.preventDefault();
        return;
      }
      if (e.target == document.getElementById("tlg_sldr")) {
        e.preventDefault();
        return;
      }
      if (!gridT.option("disabled")) {
        document.getElementById("sld_vw").classList.remove("open_sld");
        f_tggl_t();
        e.preventDefault();
      }
      if (!fldT.option("disabled")) {
        f_tggl_f();
        e.preventDefault();
      }
      if (e.target == lrt_fl) {
        lrt_fl.classList.toggle("show-lrt");
        ntp_bdy.classList.toggle("sl");
        e.preventDefault();
      }
    }

    //Function to setup grid tiles
    function f_setup_gtiles() {
      tlg = document.getElementById("tlg");
      //Check if edit_area is created 
      if (!document.getElementById("tlg_editA")) {
        var div = document.createElement("div");
        div.innerHTML = '<div id="tlg_editA" class="edit_mode"><div id="edit_bin"><i class="far fa-trash-alt"></i></div>' +
          '<div id="edit_pencil" ><i class="far fa-edit"></i></div></div>';
        tlg.parentNode.appendChild(div);
      }
      gridT = new Sortable(tlg, {
        group: {
          name: 'editM',
          pull: 'clone'
        },
        swapThreshold: 0.45,
        invertSwap: true,
        fallbackOnBody: true,
        animation: 150,
        ghostClass: 'hidden',
        disabled: 1,
        direction: "horizontal",
        draggable: ".tlg_item",
        onChange: function (evt) {
          document.getElementById("edit_bin").style.background = "transparent";
          document.getElementById("edit_pencil").style.background = "transparent";
        }
      });
      new Sortable(document.getElementById("edit_bin"), {
        group: 'editM',
        animation: 150,
        filter: ".far",
        onAdd: function (evt) {
          var itemEl = evt.item;
          itemEl.parentNode.removeChild(itemEl);
          itemEl = evt.clone;
          itemEl.parentNode.removeChild(itemEl);
          document.getElementById("edit_bin").style.background = "transparent";
        },
        onChange: function (evt) {
          document.getElementById("edit_pencil").style.background = "transparent";
          document.getElementById("edit_bin").style.background = "red";
        },
      });
      new Sortable(document.getElementById("edit_pencil"), {
        group: 'editM',
        animation: 150,
        filter: ".far",
        onAdd: function (evt) {
          var itemEl = evt.clone;
          f_etfg(itemEl);
          var itemEl = evt.item;
          itemEl.parentNode.removeChild(itemEl);
          document.getElementById("edit_pencil").style.background = "transparent";
          f_evl_gtiles();
        },
        onChange: function (evt) {
          document.getElementById("edit_bin").style.background = "transparent";
          document.getElementById("edit_pencil").style.background = "green";
        },
      });
      const edit_b2 = document.getElementById("edit_bin2");
      const edit_p2 = document.getElementById("edit_pencil2");
      const edit_o2 = document.getElementById("edit_out2");
      fldT = new Sortable(fldb, {
        group: {
          name: 'editM2',
          pull: 'clone'
        },
        swapThreshold: 0.45,
        invertSwap: true,
        fallbackOnBody: true,
        animation: 150,
        ghostClass: 'hidden',
        disabled: 1,
        direction: "horizontal",
        draggable: ".tlg_item",
        onChange: function (evt) {
          edit_b2.style.background = "transparent";
          edit_p2.style.background = "transparent";
          edit_o2.style.background = "transparent";
        }
      });
      new Sortable(edit_b2, {
        group: 'editM2',
        animation: 150,
        filter: ".far",
        onAdd: function (evt) {
          var itemEl = evt.item;
          itemEl.parentNode.removeChild(itemEl);
          itemEl = evt.clone;
          itemEl.parentNode.removeChild(itemEl);
          edit_b2.style.background = "transparent";
        },
        onChange: function (evt) {
          edit_p2.style.background = "transparent";
          edit_o2.style.background = "transparent";
          edit_b2.style.background = "red";
        },
      });
      new Sortable(edit_o2, {
        group: 'editM2',
        animation: 150,
        filter: ".far",
        onAdd: function (evt) {
          var itemEl = evt.item;
          tlg.appendChild(itemEl);
          itemEl = evt.clone;
          itemEl.parentNode.removeChild(itemEl);
          edit_o2.style.background = "transparent";
          f_tggl_f();
          f_evl_gtiles();
        },
        onChange: function (evt) {
          edit_b2.style.background = "transparent";
          edit_o2.style.background = "blue";
          edit_p2.style.background = "transparent";
        },
      });
      new Sortable(edit_p2, {
        group: 'editM2',
        animation: 150,
        filter: ".far",
        onAdd: function (evt) {
          var itemEl = evt.clone;
          f_etfg(itemEl);
          var itemEl = evt.item;
          itemEl.parentNode.removeChild(itemEl);
          edit_p2.style.background = "transparent";
          f_evl_gtiles();
        },
        onChange: function (evt) {
          edit_b2.style.background = "transparent";
          edit_o2.style.background = "transparent";
          edit_p2.style.background = "green";
        },
      });
      f_evl_gtiles();
      f_setup_sldr();
      window.setTimeout(function () {
        f_cache_tl();
      }, 900);
    }
    //Add body click used to disable edit_mode
    document.body.addEventListener("click", process_body_click);
    f_setup_gtiles();
  } // End of Tiles Grid Widget Config
  }
  load_tl();

  function load_wt(){
    
  //Weather Settings Config
  var ntp_wth = localGet("ntp_wth");
  if (ntp_wth == undefined) {
    ntp_wth = {
      api: "",
      lon: "",
      lat: ""
    }
  }
  document.getElementById("wt_ik").value = ntp_wth.api;
  document.getElementById("wt_ila").value = ntp_wth.lat;
  document.getElementById("wt_iln").value = ntp_wth.lon;
  function f_save_wth() {
    const api = document.getElementById("wt_ik").value;
    const lat = document.getElementById("wt_ila").value;
    const lon = document.getElementById("wt_iln").value;
    if (api && lat && lon) {
      ntp_wth.api = api;
      ntp_wth.lon = lon;
      ntp_wth.lat = lat;
      localStore("ntp_wth", ntp_wth);
      f_setup_wth();
      showBox("Config of Weather saved ! ");
    } else {
      showBox("ops.. Invalid values , fill all the 3 input ! ");
    }

  }
  function f_get_ll() {
    try {
      navigator.geolocation.getCurrentPosition(showPosition);
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }
  function showPosition(position) {
    document.getElementById("wt_ila").value = position.coords.latitude;
    document.getElementById("wt_iln").value = position.coords.longitude;
  }
  //End of Weather Settings Config

  //Weather Widget Config
  if (ntp_sett.status[2]) {
    const cloudsI = '<svg version="1.1" x="0px" y="0px" viewBox="0 0 60.7 40" style="enable-background:new 0 0 60.7 40;" xml:space="preserve"> <g fill="#fff"> <path d="M47.2,40H7.9C3.5,40,0,36.5,0,32.1l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9v0 C55.1,36.5,51.6,40,47.2,40z"/> <circle cx="17.4" cy="22.8" r="9.3"/> <circle cx="34.5" cy="21.1" r="15.6"/> <animateTransform attributeName="transform" attributeType="XML" dur="6s" keyTimes="0;0.5;1" repeatCount="indefinite" type="translate" values="0;5;0" calcMode="linear"> </animateTransform> </g> <g fill="#ccc"> <path d="M54.7,22.3H33.4c-3.3,0-6-2.7-6-6v0c0-3.3,2.7-6,6-6h21.3c3.3,0,6,2.7,6,6v0 C60.7,19.6,58,22.3,54.7,22.3z"/> <circle cx="45.7" cy="10.7" r="10.7"/> <animateTransform attributeName="transform" attributeType="XML" dur="6s" keyTimes="0;0.5;1" repeatCount="indefinite" type="translate" values="0;-3;0" calcMode="linear"> </animateTransform> </g> </svg>';
    const rainyI = '<svg version="1.1" x="0px" y="0px" viewBox="0 0 55.1 60" style="enable-background:new 0 0 55.1 49.5;" xml:space="preserve"> <g fill="#fff"> <path d="M20.7,46.4c0,1.7-1.4,3.1-3.1,3.1s-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S20.7,44.7,20.7,46.4z"></path> <path d="M31.4,46.4c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S31.4,44.7,31.4,46.4z"> </path> <path d="M41.3,46.4c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S41.3,44.7,41.3,46.4z"> </path> <animateTransform attributeName="transform" attributeType="XML" dur="1s" keyTimes="0;1" repeatCount="indefinite" type="translate" values="0 0;0 10" calcMode="linear"> </animateTransform> <animate attributeType="CSS" attributeName="opacity" attributeType="XML" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0" calcMode="linear"/> </g> <g fill="#fff"> <path d="M47.2,34.5H7.9c-4.3,0-7.9-3.5-7.9-7.9l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9 v0C55.1,30.9,51.6,34.5,47.2,34.5z"/> <circle cx="17.4" cy="17.3" r="9.3"/> <circle cx="34.5" cy="15.6" r="15.6"/> </g> </svg>';
    const crlI = '<svg version="1.1" x="0px" y="0px" viewBox="0 0 60.7 80" style="enable-background:new 0 0 60.7 55;" xml:space="preserve"> <g fill="#999"> <path d="M47.2,40H7.9C3.5,40,0,36.5,0,32.1l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9v0 C55.1,36.5,51.6,40,47.2,40z"/> <circle cx="17.4" cy="22.8" r="9.3"/> <circle cx="34.5" cy="21.1" r="15.6"/> </g> <g fill="#ccc"> <path d="M54.7,22.3H33.4c-3.3,0-6-2.7-6-6v0c0-3.3,2.7-6,6-6h21.3c3.3,0,6,2.7,6,6v0 C60.7,19.6,58,22.3,54.7,22.3z"/> <circle cx="45.7" cy="10.7" r="10.7"/> <animateTransform attributeName="transform" attributeType="XML" dur="6s" keyTimes="0;0.5;1" repeatCount="indefinite" type="translate" values="0;-3;0" calcMode="linear"> </animateTransform> </g> <g fill="#ff0"> <path d="M43.6,22.7c-0.2,0.6-0.4,1.3-0.6,1.9c-0.2,0.6-0.4,1.2-0.7,1.8c-0.4,1.2-0.9,2.4-1.5,3.5 c-1,2.3-2.2,4.6-3.4,6.8l-1.7-2.9c3.2-0.1,6.3-0.1,9.5,0l3,0.1l-1.3,2.5c-1.1,2.1-2.2,4.2-3.5,6.2c-0.6,1-1.3,2-2,3 c-0.7,1-1.4,2-2.2,2.9c0.2-1.2,0.5-2.4,0.8-3.5c0.3-1.2,0.6-2.3,1-3.4c0.7-2.3,1.5-4.5,2.4-6.7l1.7,2.7c-3.2,0.1-6.3,0.2-9.5,0 l-3.4-0.1l1.8-2.8c1.4-2.1,2.8-4.2,4.3-6.2c0.8-1,1.6-2,2.4-3c0.4-0.5,0.8-1,1.3-1.5C42.7,23.7,43.1,23.2,43.6,22.7z"/> <animate attributeType="CSS" attributeName="opacity" attributeType="XML" dur="3s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1;0;1" calcMode="linear"/> </g> <g fill="#fff"> <path d="M36.3,51.9c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S36.3,50.2,36.3,51.9z"/> <path d="M26.4,51.9c0,1.7-1.4,3.1-3.1,3.1c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S26.4,50.2,26.4,51.9z"/> <path d="M15.7,51.9c0,1.7-1.4,3.1-3.1,3.1s-3.1-1.4-3.1-3.1c0-1.7,3.1-7.8,3.1-7.8 S15.7,50.2,15.7,51.9z"/> <animateTransform attributeName="transform" attributeType="XML" dur="1s" keyTimes="0;1" repeatCount="indefinite" type="translate" values="0 0;0 10" calcMode="linear"> </animateTransform> <animate attributeType="CSS" attributeName="opacity" attributeType="XML" dur="1s" keyTimes="0;1" repeatCount="indefinite" values="1;0" calcMode="linear"/> </g> </svg>';
    const mist = '<svg version="1.1" x="0px" y="0px" viewBox="0 0 45.1 47.6" style="enable-background:new 0 0 45.1 47.6;" xml:space="preserve"> <g fill="none" stroke="#FFF" stroke-width="2" stroke-miterlimit="10"> <line x1="25.5" y1="17.3" x2="5.3" y2="17.3"/> <line x1="27" y1="20.3" x2="0" y2="20.3"/> <line x1="35" y1="24.3" x2="20" y2="24.3"/> <line x1="40" y1="27.3" x2="15" y2="27.3"/> <line x1="25.5" y1="30.3" x2="5.3" y2="30.3"/> <line x1="27" y1="33.3" x2="0" y2="33.3"/> <line x1="15" y1="36.3" x2="50" y2="36.3"/> <line x1="20" y1="39.3" x2="45" y2="39.3"/> <line x1="10" y1="42.3" x2="35" y2="42.3"/> <line x1="5" y1="45.3" x2="30" y2="45.3"/> <animateTransform attributeName="transform" attributeType="XML" dur="4s" keyTimes="0;0.5;1" repeatCount="indefinite" type="translate" values="5;0;5" calcMode="linear"> </animateTransform> <animate attributeType="CSS" attributeName="opacity" attributeType="XML" dur="4s" keyTimes="0;1" repeatCount="indefinite" values="0.3;3;" calcMode="linear"/> </g> </svg>';
    const snowy = '<svg version="1.1" x="0px" y="0px" viewBox="0 0 55.1 52.5" style="enable-background:new 0 0 55.1 52.5;" xml:space="preserve"> <g fill="#fff"> <g> <path d="M47.2,34.5H7.9c-4.3,0-7.9-3.5-7.9-7.9l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9 v0C55.1,30.9,51.6,34.5,47.2,34.5z"/> <circle cx="17.4" cy="17.3" r="9.3"/> <circle cx="34.5" cy="15.6" r="15.6"/> </g> <circle cx="37" cy="43.5" r="3"> <animateTransform attributeName="transform" attributeType="XML" dur="1.5s" keyTimes="0;0.33;0.66;1" repeatCount="indefinite" type="translate" values="1 -2;3 2; 1 4; 2 6" calcMode="linear"> </animateTransform> </circle> <circle cx="27" cy="43.5" r="3"> <animateTransform attributeName="transform" attributeType="XML" dur="1.5s" keyTimes="0;0.33;0.66;1" repeatCount="indefinite" type="translate" values="1 -2;3 2; 1 4; 2 6" calcMode="linear"> </animateTransform> </circle> <circle cx="17" cy="43.5" r="3"> <animateTransform attributeName="transform" attributeType="XML" dur="1.5s" keyTimes="0;0.33;0.66;1" repeatCount="indefinite" type="translate" values="1 -2;3 2; 1 4; 2 6" calcMode="linear"> </animateTransform> </circle> </g> </svg>';
    const icons = {
      '50d': mist,
      '50n': mist,
      '13d': snowy,
      '13n': snowy,
      '11d': crlI,
      '11n': crlI,
      '10d': rainyI,
      '10n': rainyI,
      '09d': rainyI,
      '09n': rainyI,
      '04d': cloudsI,
      '04n': cloudsI,
      '03d': cloudsI,
      '03n': cloudsI,
      '02d': '<svg version="1.1" x="0px" y="0px" viewBox="0 0 61.7 42.8" style="enable-background:new 0 0 61.7 42.8;" xml:space="preserve"> <g fill="#fff"> <path d="M47.2,42.8H7.9c-4.3,0-7.9-3.5-7.9-7.9l0,0C0,30.5,3.5,27,7.9,27h39.4c4.3,0,7.9,3.5,7.9,7.9 v0C55.1,39.2,51.6,42.8,47.2,42.8z"/> <circle cx="17.4" cy="25.5" r="9.3"/> <circle cx="34.5" cy="23.9" r="15.6"/> <animateTransform attributeName="transform" attributeType="XML" dur="6s" keyTimes="0;0.5;1" repeatCount="indefinite" type="translate" values="0;5;0" calcMode="linear"> </animateTransform> </g> <g fill="#ff0"> <circle cx="31.4" cy="18.5" r="9"/> <g> <path d="M31.4,6.6L31.4,6.6c-0.4,0-0.6-0.3-0.6-0.6V0.6C30.8,0.3,31,0,31.3,0l0.1,0 C31.7,0,32,0.3,32,0.6v5.5C32,6.4,31.7,6.6,31.4,6.6z"/> <path d="M31.4,30.1L31.4,30.1c-0.4,0-0.6,0.3-0.6,0.6v5.5c0,0.3,0.3,0.6,0.6,0.6h0.1 c0.3,0,0.6-0.3,0.6-0.6v-5.5C32,30.4,31.7,30.1,31.4,30.1z"/> <path d="M19.6,18.3L19.6,18.3c0,0.4-0.3,0.6-0.6,0.6h-5.5c-0.3,0-0.6-0.3-0.6-0.6v-0.1 c0-0.3,0.3-0.6,0.6-0.6H19C19.3,17.8,19.6,18,19.6,18.3z"/> <path d="M43.1,18.3L43.1,18.3c0,0.4,0.3,0.6,0.6,0.6h5.5c0.3,0,0.6-0.3,0.6-0.6v-0.1 c0-0.3-0.3-0.6-0.6-0.6h-5.5C43.4,17.8,43.1,18,43.1,18.3z"/> <path d="M22.4,26L22.4,26c0.3,0.3,0.2,0.7,0,0.9l-4.2,3.6c-0.2,0.2-0.6,0.2-0.8-0.1l-0.1-0.1 c-0.2-0.2-0.2-0.6,0.1-0.8l4.2-3.6C21.9,25.8,22.2,25.8,22.4,26z"/> <path d="M40.3,10.7L40.3,10.7c0.3,0.3,0.6,0.3,0.8,0.1l4.2-3.6c0.2-0.2,0.3-0.6,0.1-0.8l-0.1-0.1 c-0.2-0.2-0.6-0.3-0.8-0.1l-4.2,3.6C40.1,10.1,40,10.5,40.3,10.7z"/> <path d="M22.4,10.8L22.4,10.8c0.3-0.3,0.2-0.7,0-0.9l-4.2-3.6c-0.2-0.2-0.6-0.2-0.8,0.1l-0.1,0.1 c-0.2,0.2-0.2,0.6,0.1,0.8l4.2,3.6C21.9,11,22.2,11,22.4,10.8z"/> <path d="M40.3,26.1L40.3,26.1c0.3-0.3,0.6-0.3,0.8-0.1l4.2,3.6c0.2,0.2,0.3,0.6,0.1,0.8l-0.1,0.1 c-0.2,0.2-0.6,0.3-0.8,0.1l-4.2-3.6C40.1,26.7,40,26.3,40.3,26.1z"/> <animate attributeType="CSS" attributeName="opacity" attributeType="XML" dur="0.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1;0.6;1" calcMode="linear"/> </g> <animateTransform attributeName="transform" attributeType="XML" dur="2s" keyTimes="0;1" repeatCount="indefinite" type="scale" values="1;1" calcMode="linear"> </animateTransform> </g> <g fill="#ccc"> <path d="M55.7,25.1H34.4c-3.3,0-6-2.7-6-6v0c0-3.3,2.7-6,6-6h21.3c3.3,0,6,2.7,6,6v0 C61.7,22.4,59,25.1,55.7,25.1z"/> <circle cx="46.7" cy="13.4" r="10.7"/> <animateTransform attributeName="transform" attributeType="XML" dur="6s" keyTimes="0;0.5;1" repeatCount="indefinite" type="translate" values="0;-3;0" calcMode="linear"> </animateTransform> </g> </svg>',
      '02n': '<svg version="1.1" x="0px" y="0px" viewBox="0 0 60.7 44.4" style="enable-background:new 0 0 60.7 44.4;" xml:space="preserve"> <g fill="#fff"> <path d="M47.2,44.4H7.9c-4.3,0-7.9-3.5-7.9-7.9l0,0c0-4.3,3.5-7.9,7.9-7.9h39.4c4.3,0,7.9,3.5,7.9,7.9 v0C55.1,40.9,51.6,44.4,47.2,44.4z"/> <circle cx="17.4" cy="27.2" r="9.3"/> <circle cx="34.5" cy="25.5" r="15.6"/> <animateTransform attributeName="transform" attributeType="XML" dur="6s" keyTimes="0;0.5;1" repeatCount="indefinite" type="translate" values="0;5;0" calcMode="linear"> </animateTransform> </g> <path fill="#ff0" d="M33.6,17.9c-0.2-7.7,4.9-14.4,12-16.4c-2.3-1-4.9-1.5-7.6-1.5c-9.8,0.3-17.5,8.5-17.2,18.3 c0.3,9.8,8.5,17.5,18.3,17.2c2.7-0.1,5.2-0.8,7.5-1.9C39.3,32,33.8,25.6,33.6,17.9z"/> <g fill="#ccc"> <path d="M54.7,26.8H33.4c-3.3,0-6-2.7-6-6v0c0-3.3,2.7-6,6-6h21.3c3.3,0,6,2.7,6,6v0 C60.7,24.1,58,26.8,54.7,26.8z"/> <circle cx="45.7" cy="15.1" r="10.7"/> <animateTransform attributeName="transform" attributeType="XML" dur="6s" keyTimes="0;0.5;1" repeatCount="indefinite" type="translate" values="0;-3;0" calcMode="linear"> </animateTransform> </g> </svg>',
      '01d': '<svg version="1.1" x="0px" y="0px" viewBox="0 0 44.9 44.9" xml:space="preserve"> <g fill="#ff0"> <circle cx="22.4" cy="22.6" r="11"/> <g> <path d="M22.6,8.1h-0.3c-0.3,0-0.6-0.3-0.6-0.6v-7c0-0.3,0.3-0.6,0.6-0.6l0.3,0c0.3,0,0.6,0.3,0.6,0.6 v7C23.2,7.8,22.9,8.1,22.6,8.1z"/> <path d="M22.6,36.8h-0.3c-0.3,0-0.6,0.3-0.6,0.6v7c0,0.3,0.3,0.6,0.6,0.6h0.3c0.3,0,0.6-0.3,0.6-0.6v-7 C23.2,37,22.9,36.8,22.6,36.8z"/> <path d="M8.1,22.3v0.3c0,0.3-0.3,0.6-0.6,0.6h-7c-0.3,0-0.6-0.3-0.6-0.6l0-0.3c0-0.3,0.3-0.6,0.6-0.6h7 C7.8,21.7,8.1,21.9,8.1,22.3z"/> <path d="M36.8,22.3v0.3c0,0.3,0.3,0.6,0.6,0.6h7c0.3,0,0.6-0.3,0.6-0.6v-0.3c0-0.3-0.3-0.6-0.6-0.6h-7 C37,21.7,36.8,21.9,36.8,22.3z"/> <path d="M11.4,31.6l0.2,0.3c0.2,0.2,0.2,0.6-0.1,0.8l-5.3,4.5c-0.2,0.2-0.6,0.2-0.8-0.1l-0.2-0.3 c-0.2-0.2-0.2-0.6,0.1-0.8l5.3-4.5C10.9,31.4,11.2,31.4,11.4,31.6z"/> <path d="M33.2,13l0.2,0.3c0.2,0.2,0.6,0.3,0.8,0.1l5.3-4.5c0.2-0.2,0.3-0.6,0.1-0.8l-0.2-0.3 c-0.2-0.2-0.6-0.3-0.8-0.1l-5.3,4.5C33,12.4,33,12.7,33.2,13z"/> <path d="M11.4,13.2l0.2-0.3c0.2-0.2,0.2-0.6-0.1-0.8L6.3,7.6C6.1,7.4,5.7,7.5,5.5,7.7L5.3,7.9 C5.1,8.2,5.1,8.5,5.4,8.7l5.3,4.5C10.9,13.5,11.2,13.5,11.4,13.2z"/> <path d="M33.2,31.9l0.2-0.3c0.2-0.2,0.6-0.3,0.8-0.1l5.3,4.5c0.2,0.2,0.3,0.6,0.1,0.8l-0.2,0.3 c-0.2,0.2-0.6,0.3-0.8,0.1l-5.3-4.5C33,32.5,33,32.1,33.2,31.9z"/> <animate attributeType="CSS" attributeName="opacity" attributeType="XML" dur="0.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1;0.6;1" calcMode="linear"/> </g> </g> </svg>',
      '01n': '<svg version="1.1" x="0px" y="0px" viewBox="0 0 30.8 42.5" xml:space="preserve" > <path fill="#ff0" d="M15.3,21.4C15,12.1,21.1,4.2,29.7,1.7c-2.8-1.2-5.8-1.8-9.1-1.7C8.9,0.4-0.3,10.1,0,21.9 c0.3,11.7,10.1,20.9,21.9,20.6c3.2-0.1,6.3-0.9,8.9-2.3C22.2,38.3,15.6,30.7,15.3,21.4z"/> </svg>'
    };
    function capitalizeF(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function getJSON(url) {
      var resp = '';
      var xmlHttp = new XMLHttpRequest();
      if (xmlHttp != null) {
        xmlHttp.open("GET", url, false, {
          async: true
        });
        try {
          xmlHttp.send(null);
        } catch {
          console.error("xmlHttp send failed");
        }
        resp = xmlHttp.responseText;
      }
      return resp;
    }
    function f_setup_wth() {
      var appid = ntp_wth.api;
      if (appid.length > 6 && appid != "") {
        document.getElementById('wth_s').style.display = "none";
        var url = 'https://api.openweathermap.org/data/2.5/find?lat=' + ntp_wth.lat + '&lon=' + ntp_wth.lon + '&cnt=1&appid=' + appid + '&callback=?';
        var data = getJSON(url);
        if (data == "") return;
        data = JSON.parse(data.substring(2, data.length - 1));
        //Loading
        document.getElementById("wth_l").style.opacity = 1;
        document.getElementById("wth_c").innerHTML = data.list[0].name;
        document.getElementById("wth_i").innerHTML = icons[data.list[0].weather[0].icon];
        document.getElementById("wth_d1").innerHTML = capitalizeF(data.list[0].weather[0].description);
        var temp = (data.list[0].main.temp - 273.15).toFixed(0);
        var temp_f = (data.list[0].main.feels_like - 273.15).toFixed(0);
        var temp_min = (data.list[0].main.temp_min - 273.15).toFixed(0);
        var temp_max = (data.list[0].main.temp_max - 273.15).toFixed(0);
        var tt = "&#8451;";
        var windDeg = data.list[0].wind.deg;
        //convert to F
        if (0) {
          temp = (1.8 * temp + 32).toFixed(0);
          temp_f = (1.8 * temp_f + 32).toFixed(0);
          temp_min = (1.8 * temp_min + 32).toFixed(0);
          temp_max = (1.8 * temp_max + 32).toFixed(0);
          tt = "&#8457;";
        }
        document.getElementById("wth_t").innerHTML = temp + tt;
        document.getElementById("wth_mm").innerHTML = temp_max + tt + " / " + temp_min + tt;

        document.getElementById('wth_w').innerHTML = ('<i class="far fa-wind _' + windDeg + '-deg" title="Wind direction (' + windDeg + ' degrees)"></i> ' + data.list[0].wind.speed + " mps");
        document.getElementById('wth_h').innerHTML = ('<i class="fal fa-humidity"></i>  ' + data.list[0].main.humidity + "%");
        document.getElementById('wth_top').style.opacity = 1;
        document.getElementById('wth_btm').style.opacity = 1;
        document.getElementById('wth_l').style.display = "none";
      } else {
        document.getElementById('wth_l').style.display = "none";
        document.getElementById('wth_s').style.opacity = 1;
      }
    }
    f_setup_wth();
    /* Click on widget to show more info
    document.getElementsByClassName('').addEventListener('click', function(){
      
    });*/

  }
  // End of Weather Widget Config
  }
  load_wt();

  function load_ns(){
    //News Section Widget Config
  if (ntp_sett.status[3]) {
    var forceReload = false;
    // Check if 30h passed and clean the news 
    function shouldIC() {
      const date1 = new Date();
      const date2 = new Date(localStorage.shouldIC);
      if (localStorage.shouldIC == undefined) {
        localStorage.shouldIC = date1;
        return false;
      }
      const diffTime = Math.abs(date2 - date1);
      const diffH = Math.ceil(diffTime / (1000 * 60 * 60));
      if (diffH < 30) return false;
      localStorage.shouldI = date1;
      return true;
    }
    //Function that add delete item news on swipe
    function f_astd() {
      var xDown = xDiff = null;
      const ntms = document.getElementsByClassName("news_item");
      for (var i = 0; i < ntms.length; i++) {
        ntms[i].addEventListener(mLstnr[2], f_ev_start, {
          passive: true
        });
        ntms[i].addEventListener(mLstnr[0], f_ev_move, {
          passive: true
        });
        ntms[i].addEventListener(mLstnr[1], f_ev_end, {
          passive: true
        });
      }

      function f_ev_start(evt) {
        xDown = (isTD) ? evt.touches[0].clientX : evt.pageX;
      }

      function f_ev_move(evt) {
        var el = (evt.target.closest("div.news_item"));
        el.style.transition = "margin 0ms";
        if (!xDown) return;
        var xUp = (isTD) ? evt.touches[0].clientX : evt.pageX;
        xDiff = xDown - xUp;
        if (xDiff < 20 && xDiff > -20) return;
        if (xDiff < -20) el.style.marginLeft = ((Math.abs(xDiff))) + 'px';
        else el.style.marginLeft = "-" + (xDiff) + 'px';
        if (xDiff < 130 && xDiff > -130) el.style.opacity = "1" - ((Math.abs(xDiff)) / 130);
      }

      function f_ev_end(evt) {
        var el = (evt.target.closest("div.news_item"));
        if (xDiff > 130 || xDiff < -130) {
          el.parentNode.removeChild(el);
          f_cache_ns();
        } else {
          el.style.transition = "margin 600ms";
          el.style.opacity = "1";
          el.style.marginLeft = '4px';
        }
        xDiff = xDown = null;
      }
    }
    //Function to cache the news section
    function f_cache_ns() {
      if ((typeof localStorage.cachedNewsUpdate == "undefined") || ((Date.now() / 1000) - localStorage.cachedNewsUpdate) >= 0.1) {
        const pos = (ntp_sett.order).indexOf(3);
        ntp_wdg[3].cached = document.getElementById('wdg_'+pos).innerHTML;
        localStorage.cachedNewsUpdate = (Date.now() / 1000);
        console.log("Cache news section : " + localStorage.cachedNewsUpdate);
      }
      localStore("ntp_wdg", ntp_wdg);
    }
    //Function to toggle news view mode ( compact / standard )
    function f_tnv() {
      const x = document.getElementsByClassName("newsT_icon");
      if (getComputedStyle(ntp_bdy).getPropertyValue("--o4") == "150px") {
        ntp_bdy.style.setProperty("--o4", "auto");
        x[0].innerHTML = '<i class="fas fa-rectangle-wide"></i>';
        document.getElementById("stt_opt4").checked = false;
      } else {
        ntp_bdy.style.setProperty("--o4", "150px");
        x[0].innerHTML = '<i class="fas fa-stream"></i>';
        document.getElementById("stt_opt4").checked = true;
      }
      save_ntpbdy();
      f_cache_ns();
    }
    //Function to reload news ( 1 for full clean )
    function f_nsrl(t) {
      if (t == 1 || t == 2) {
        localStorage.removeItem('itemsNews');
        localStorage.newsLe = document.getElementById('newsL').value;
        document.getElementById('news').innerHTML = '';
        if (t == 2) showBox("Fetched news cleaned !");
      }
      localStorage.removeItem('cachedNewsUpdate');
      forceReload = true;
      loadGNews();
      window.setTimeout(function () {
        f_astd();
      }, 1000);
      window.setTimeout(function () {
        f_astd();
      }, 2000);
    }
    //Function to convert locale into readable text
    function locale_to_readabletext(string) {
      string = string.replace('%3A', ':');
      for (let locale in locales) {
        if (locales[locale].replace('%3A', ':') == string)
          return locale;
      }
      return null;
    }
    var loadingSVG;
    //Function for svg loading news animation
    function render_news_loading() {
      loadingSVG = document.createElement('div');
      loadingSVG.id = "loadingNW";
      loadingSVG.innerHTML = '<svg x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"/><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"/></rect><rect x="10" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"/><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"/></rect><rect x="20" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"/><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"/></rect></svg>';
      document.getElementById('news').prepend(loadingSVG);
    }
    //Function to create an id for news to track them
    function c_itemnews_ID(title) {
      var result = title.toUpperCase().replace(/\b(\S{1,2})\S*/g, '$1').replace(/ /g, '').replace(/[^a-z0-9]/gi, '');
      var tResult = result.substring(0, 8);
      return tResult;
    }
    //Function to add a news item 
    function add_gnews(title, news_time, source, source_logo, link, image) {
      const itemID = c_itemnews_ID(title);
      //If the news has been fetched, don't add it
      if ((localStorage.itemsNews && (localStorage.itemsNews).indexOf(itemID) > -1)) return;
      var itemsNews = [];
      if (localStorage.getItem('itemsNews')) itemsNews = JSON.parse(localStorage.getItem('itemsNews'));
      itemsNews.push(itemID);
      localStorage.setItem('itemsNews', JSON.stringify(itemsNews));
      var innerDiv = document.createElement('div');
      innerDiv.className = 'news_item';
      innerDiv.id = itemID;
      innerDiv.innerHTML = '<img src="' + image + '" class="news_img" />' +
        '<div class="news_cnt">' +
        '<span class="news_attr"><img src="' + source_logo + '"/>&nbsp;&nbsp;&nbsp;<a href="' + link + '">' + source +
        '</a></span>' +
        '<div class="news_title"><a href="' + link + '">' +
        title + '</a></div>' +
        '<span class="news_time" data-time="' + news_time.a + '">' + news_time.b + '</span></a></div>';
      document.getElementById('news').prepend(innerDiv);
    }
    //Function to render news ( get news from gnews )
    function render_gnews(answer) {
      var el = document.createElement('div');
      el.style.display = 'none';
      el.baseURI = newsServer;
      el.innerHTML = answer.replace(new RegExp('<img', 'gi'), '<source');
      var articles = el.getElementsByTagName('article');
      loadingSVG.remove();
      for (var i = articles.length - 1; i > 0; i--) {
        var article = articles[i];
        var title = null;
        var link = null;
        var image = null;
        var source = null;
        var source_logo = null;
        var news_time = null;
        link = article.querySelector("a.VDXfz").href;
        title = article.querySelector("h4 a.DY5T1d").innerHTML;
        try {
          image = article.querySelector(".QwxBBf").src;
        } catch {}
        source = article.querySelector("a.wEwyrc").innerHTML;
        source_logo = article.querySelector(".wsLqz source").src;
        news_time = {
          'a': article.querySelector(".WW6dff").getAttribute("datetime"),
          'b': article.querySelector(".WW6dff").innerHTML
        };
        if (link) link = link.replace(/.+?(?=articles)/, 'https://news.google.com/');
        if (link && image && title) {
          add_gnews(title, news_time, source, source_logo, link, image);
        }
      }
      f_cache_ns(); //Cache the news items
    }
    console.log('News locale is ' + localStorage.newsLe);
    //Function to load news 
    function loadGNews() {
      if (shouldIC()) {
        document.getElementById('news').innerHTML == ""
      }
      if ((document.getElementById('news').innerHTML == "") ||
        ((Date.now() / 1000) - localStorage.cachedNewsUpdate) > 3600 || forceReload) {
        forceReload = false;
        console.log("Fetching news..");
        render_news_loading();
        try {

          fetch(newsServer + 'foryou' + localStorage.newsLe, {
              method: 'GET',
              credentials: 'include'
            })
            .then(function (response) {
              if (response.url.includes("&ceid=")) {
                localStorage.newsLe = response.url.substr(response.url.lastIndexOf('?'));
              }
              return response.text();
            }).then(function (answer) {
              render_gnews(answer);
              localStorage.cachedNewsUpdate = (Date.now() / 1000);
            });
        } catch (err) {
          console.log('Fetch news failed for: ' + err.message);
        }
        try {
          fetch(newsServer + localStorage.newsLe, {
              method: 'GET',
              mode: 'cors'
            })
            .then(function (response) {
              if (response.url.includes("&ceid=")) {
                localStorage.newsLe = response.url.substr(response.url.lastIndexOf('?'));
              }
              return response.text();
            })
            .then(function (answer) {
              render_gnews(answer);
              localStorage.cachedNewsUpdate = (Date.now() / 1000);
            });
        } catch (err) {
          console.log('Fetch generic news failed for: ' + err.message);
        }
      }
    }
    const locales = {
      'English | Australia': '?hl=en-AU&gl=AU&ceid=AU:en',
      'English | Botswana': '?hl=en-BW&gl=BW&ceid=BW:en',
      'English | Canada': '?hl=en-CA&gl=CA&ceid=CA:en',
      'English | Ethiopia': '?hl=en-ET&gl=ET&ceid=ET:en',
      'English | Ghana': '?hl=en-GH&gl=GH&ceid=GH:en',
      'English | India': '?hl=en-IN&gl=IN&ceid=IN:en',
      'English | Indonesia': '?hl=en-ID&gl=ID&ceid=ID:en',
      'English | Ireland': '?hl=en-IE&gl=IE&ceid=IE:en',
      'English | Israel': '?hl=en-IL&gl=IL&ceid=IL:en',
      'English | Kenya': '?hl=en-KE&gl=KE&ceid=KE:en',
      'English | Latvia': '?hl=en-LV&gl=LV&ceid=LV:en',
      'English | Malaysia': '?hl=en-MY&gl=MY&ceid=MY:en',
      'English | Namibia': '?hl=en-NA&gl=NA&ceid=NA:en',
      'English | New Zealand': '?hl=en-NZ&gl=NZ&ceid=NZ:en',
      'English | Nigeria': '?hl=en-NG&gl=NG&ceid=NG:en',
      'English | Pakistan': '?hl=en-PK&gl=PK&ceid=PK:en',
      'English | Philippines': '?hl=en-PH&gl=PH&ceid=PH:en',
      'English | Singapore': '?hl=en-SG&gl=SG&ceid=SG:en',
      'English | South Africa': '?hl=en-ZA&gl=ZA&ceid=ZA:en',
      'English | Tanzania': '?hl=en-TZ&gl=TZ&ceid=TZ:en',
      'English | Uganda': '?hl=en-UG&gl=UG&ceid=UG:en',
      'English | United Kingdom': '?hl=en-GB&gl=GB&ceid=GB:en',
      'English | United States': '?hl=en-US&gl=US&ceid=US:en',
      'English | Zimbabwe': '?hl=en-ZW&gl=ZW&ceid=ZW:en',
      'Bahasa Indonesia | Indonesia': '?hl=id&gl=ID&ceid=ID%3Aid',
      'Čeština | Česko': '?hl=cs&gl=CZ&ceid=CZ%3Acs',
      'Deutsch | Deutschland': '?hl=de&gl=DE&ceid=DE%3Ade',
      'Deutsch | Österreich': '?hl=de&gl=AT&ceid=AT%3Ade',
      'Deutsch | Schweiz': '?hl=de&gl=CH&ceid=CH%3Ade',
      'Español | Argentina': '?hl=es-419&gl=AR&ceid=AR%3Aes-419',
      'Español | Chile': '?hl=es-419&gl=CL&ceid=CL%3Aes-419',
      'Español | Colombia': '?hl=es-419&gl=CO&ceid=CO%3Aes-419',
      'Español | Cuba': '?hl=es-419&gl=CU&ceid=CU%3Aes-419',
      'Español | Estados Unidos': '?hl=es-419&gl=US&ceid=US%3Aes-419',
      'Español | México': '?hl=es-419&gl=MX&ceid=MX%3Aes-419',
      'Español | Perú': '?hl=es-419&gl=PE&ceid=PE%3Aes-419',
      'Español | Venezuela': '?hl=es-419&gl=VE&ceid=VE%3Aes-419',
      'Français | Belgique': '?hl=fr&gl=BE&ceid=BE%3Afr',
      'Français | Canada': '?hl=fr-CA&gl=CA&ceid=CA:fr',
      'Français | France': '?hl=fr&gl=FR&ceid=FR%3Afr',
      'Français | Maroc': '?hl=fr&gl=MA&ceid=MA%3Afr',
      'Français | Sénégal': '?hl=fr&gl=SN&ceid=SN%3Afr',
      'Français | Suisse': '?hl=fr&gl=CH&ceid=CH%3Afr',
      'Italiano | Italia': '?hl=it&gl=IT&ceid=IT%3Ait',
      'Latviešu | Latvija': '?hl=lv&gl=LV&ceid=LV%3Alv',
      'Lietuvių | Lietuva': '?hl=lt&gl=LT&ceid=LT%3Alt',
      'Magyar | Magyarország': '?hl=hu&gl=HU&ceid=HU%3Ahu',
      'Nederlands | België': '?hl=nl&gl=BE&ceid=BE%3Anl',
      'Nederlands | Nederland': '?hl=nl&gl=NL&ceid=NL%3Anl',
      'Norsk | Norge': '?hl=no&gl=NO&ceid=NO%3Ano',
      'Polski | Polska': '?hl=pl&gl=PL&ceid=PL%3Apl',
      'Português | Brasil': '?hl=pt-BR&gl=BR&ceid=BR%3Apt-419',
      'Português | Portugal': '?hl=pt-PT&gl=PT&ceid=PT%3Apt-150',
      'Română | România': '?hl=ro&gl=RO&ceid=RO%3Aro',
      'Slovenčina | Slovensko': '?hl=sk&gl=SK&ceid=SK%3Ask',
      'Slovenščina | Slovenija': '?hl=sl&gl=SI&ceid=SI%3Asl',
      'Svenska | Sverige': '?hl=sv&gl=SE&ceid=SE%3Asv',
      'Tiếng Việt | Việt Nam': '?hl=vi&gl=VN&ceid=VN%3Avi',
      'Türkçe | Türkiye': '?hl=tr&gl=TR&ceid=TR%3Atr',
      'Ελληνικά | Ελλάδα': '?hl=el&gl=GR&ceid=GR%3Ael',
      'Български | България': '?hl=bg&gl=BG&ceid=BG%3Abg',
      'Русский | Россия': '?hl=ru&gl=RU&ceid=RU%3Aru',
      'Русский | Украина': '?hl=ru&gl=UA&ceid=UA%3Aru',
      'Српски | Србија': '?hl=sr&gl=RS&ceid=RS%3Asr',
      'Українська | Україна': '?hl=uk&gl=UA&ceid=UA%3Auk',
      'עברית | ישראל': '?hl=he&gl=IL&ceid=IL%3Ahe',
      'العربية | الإمارات العربية المتحدة': '?hl=ar&gl=AE&ceid=AE%3Aar',
      'العربية | المملكة العربية السعودية': '?hl=ar&gl=SA&ceid=SA%3Aar',
      'العربية | لبنان': '?hl=ar&gl=LB&ceid=LB%3Aar',
      'العربية | مصر': '?hl=ar&gl=EG&ceid=EG%3Aar',
      'मराठी | भारत': '?hl=mr&gl=IN&ceid=IN%3Amr',
      'हिन्दी | भारत': '?hl=hi&gl=IN&ceid=IN%3Ahi',
      'বাংলা | বাংলাদেশ': '?hl=bn&gl=BD&ceid=BD%3Abn',
      'தமிழ் | இந்தியா': '?hl=ta&gl=IN&ceid=IN%3Ata',
      'മലയാളം | ഇന്ത്യ': '?hl=ml&gl=IN&ceid=IN%3Aml',
      'తెలుగు | భారతదేశం': '?hl=te&gl=IN&ceid=IN%3Ate',
      'ไทย | ไทย': '?hl=th&gl=TH&ceid=TH%3Ath',
      '中文 | 中国': '?hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
      '中文 | 台灣': '?hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant',
      '中文 | 香港': '?hl=zh-HK&gl=HK&ceid=HK%3Azh-Hant',
      '한국어 | 대한민국': '?hl=ko&gl=KR&ceid=KR%3Ako',
    };
    if (!localStorage.newsLe) localStorage.newsLe = "?hl=en-US&gl=US&ceid=US:en";
    document.getElementById('newsL').value = localStorage.newsLe;
    //Add options for news locale
    const sel = document.getElementById("newsL");
    if (sel.options.length < 20) {
      for (var el in locales) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(el));
        opt.value = locales[el];
        sel.appendChild(opt);
        if (locales[el] == localStorage.newsLe) opt.selected = true;
      }
    }
    adaptColor("newsL", getComputedStyle(ntp_cnt).getPropertyValue("--c25"));
    preconnectTo(newsServer);
    loadGNews();
    //Add swipe to delete on news items
    window.setTimeout(function () {
      f_astd();
    }, 1000);
    window.setTimeout(function () {
      f_astd();
    }, 2000);
  }
  //End of News Section Widget Config
  }
  load_ns()

  function load_tb(){
//Tabs Widget Config
  if (ntp_sett.status[4]) {
    //Save widget by caching it
    function f_cache_tb(ntvalue) {
      if (ntvalue) {
        ntp_wdg[4].ntarea = ntvalue;
      } else {
        const pos = (ntp_sett.order).indexOf(4);
        ntp_wdg[4].cached = document.getElementById('wdg_'+pos).innerHTML;
      }
      localStore("ntp_wdg", ntp_wdg);
    }
    //Setup of tabs widget 
    function f_setup_tabs() {
      //Notes
      const ntarea = document.getElementById("ntarea");
      ntarea.value = ntp_wdg[4].ntarea;
      ntarea.addEventListener('blur', function () {
        f_cache_tb(ntarea.value);
      })
      //To-do List
      const formtd = document.getElementById("tdlform");
      const tdlist = document.getElementById("tdlist");
      const tdlinput = document.getElementById("tdlinput");

      function f_ev_tdl() {
        const tli = tdlist.querySelectorAll('li');
        tli.forEach(element => {
          element.addEventListener('click', function (e) {
            const t = e.target;
            if (t.classList.contains('tdchecked')) t.parentNode.removeChild(t);
            else t.classList.add('tdchecked');
            f_cache_tb();
          }, false);
        });
      }

      formtd.addEventListener('submit', function (e) {
        e.preventDefault();
        tdlist.innerHTML += '<li>' + tdlinput.value + '</li>';
        tdlinput.value = "";
        f_ev_tdl();
        f_cache_tb();
      }, false);
      f_ev_tdl();
      //Links 
      const formlk = document.getElementById("lkform");
      const lklist = document.getElementById("lklist");
      const lkinput = document.getElementById("lkinput");

      function f_ev_lkl() {
        const li = lklist.querySelectorAll('li');
        li.forEach(element => {
          element.oncontextmenu = function (e) {
            e.preventDefault();
            lklist.removeChild(element);
            f_cache_tb();
          };
          element.addEventListener('click', function () {
            location.href = element.innerHTML;
          }, false);
        });
      }
      formlk.addEventListener('submit', function (e) {
        e.preventDefault();
        lklist.innerHTML += '<li>' + lkinput.value + '</li>';
        lkinput.value = "";
        f_cache_tb();
        f_ev_lkl()
      }, false);
      f_ev_lkl();
    }
    //Call tabs setup
    f_setup_tabs();
  }
  //End of Tabs Widget Config 
  }
  load_tb();

  //Config widgets ordering and toggle
  var listO = new Sortable.create(document.getElementById("stt_lwo"), {
    handle: '.stt_lwoh',
    animation: 150,
    onEnd: function (evt) {
      var list = document.getElementById("stt_lwo").getElementsByTagName("li");
      console.log("OnEnd 1:>>"+ntp_sett.order);
      for (var z = 0; z < list.length; z++) {
        var widget = parseInt(list[z].getAttribute("data-id"));
        ntp_sett.order[z] = widget;
        orderListChanged = 1;
      }
      console.log("OnEnd 2:>>"+ntp_sett.order);
      localStore("ntp_sett", ntp_sett);
      load_widgets();
      console.log("OnEnd 3:>>"+ntp_sett.order);
      if (ntp_sett.status[1])load_tl();
      if (ntp_sett.status[4])load_tb();
      if (ntp_sett.status[2])load_wt();
    }
  });

  function toggle_widget(i) {
    var pos= (ntp_sett.order).indexOf(i);
    var status = (ntp_sett.status[i] == 1) ? 0 : 1;
    console.log(" Widget : " + i + " Order : " + pos + " Status :" + ntp_sett.status[i] + " - >" + status);
    ntp_sett.status[i] = status;
    document.getElementById("wdg_" + pos).style.display = (status) ? "block" : "none";
    customInner(document.getElementById("wdg_" + pos), (status) ? ntp_wdg[i].cached : "");
    localStore("ntp_sett", ntp_sett);
    if (ntp_sett.status[i] && i == 1) load_tl();
    if (ntp_sett.status[i] && i == 4) load_tb();
    if (ntp_sett.status[i] && i == 2) load_wt();
  }
  //End of Config widgets ordering and toggle

  //Function to generate gradient color
  function random_gradient() {
    var colorOne = {
      R: Math.floor(Math.random() * 255),
      G: Math.floor(Math.random() * 255),
      B: Math.floor(Math.random() * 255)
    };
    var colorTwo = {
      R: Math.floor(Math.random() * 255),
      G: Math.floor(Math.random() * 255),
      B: Math.floor(Math.random() * 255)
    };
    colorOne.rgb = 'rgb(' + colorOne.R + ',' + colorOne.G + ',' + colorOne.B + ')';
    colorTwo.rgb = 'rgb(' + colorTwo.R + ',' + colorTwo.G + ',' + colorTwo.B + ')';
    var gradientC = 'radial-gradient(at top left, ' + colorOne.rgb + ', ' + colorTwo.rgb + ')';
  }

  //********* BG Wallpaper */
  const wDevice = (window.innerWidth) ? window.innerWidth : screen.width;
  const hDevice = (window.innerHeight) ? (window.innerHeight + 56) : screen.height;
  const bg_pld = document.getElementById('bg_pld'),
    crop = document.getElementById('crop'),
    result = document.getElementById('result'),
    imgRes = document.getElementById('imgRes'),
    crpp = document.getElementById('croppie');
  var cr, cr_img = '',
    img_w = wDevice / 2,
    img_h = hDevice / 2,
    isCrop = 0;
  while (img_w > 670) {
    img_w = img_w / 1.2;
    img_h = img_h / 1.2;
  }
  ntp_bdy.style.setProperty("--bg-cw", img_w + "px");
  ntp_bdy.style.setProperty("--bg-ch", img_h + "px");
  function savebg_cropped(t) {
    ntp_bdy.style.setProperty("--bg-img", "url(" + imgRes.src + ")");
    ntp_bdy.style.setProperty("--bg-cl", "#fff");
    save_ntpbdy();
    save_ntpbdy();
    showBox(" Background saved !");
    cropCancel();
  }
  const wllp_file = document.getElementById("wllp_file");
  function f_wallp1() {
    var file = wllp_file.files[0];
    if (file && file.type.match('image.*')) {
      var reader = new FileReader();
      reader.onload = function (e) {
        bg_pld.style.display = "none";
        if (cr_img == '') {
          cr_img = e.target.result;
          cropInit();
        } else {
          cr_img = e.target.result;
          bindCropImg();
        }
        crop.style.display = "inline";
      }
      reader.readAsDataURL(file);
    }
  }
  function f_wallp2() {
    var url = prompt("Enter url of the wallpaper . \nExample : ", "url");
    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = function (e) {
      bg_pld.style.display = "none";
      if (cr_img == '') {
        cr_img = image.src;
        cropInit();
      } else {
        cr_img = image.src;
        bindCropImg();
      }
      crop.style.display = "inline";
    };
    image.src = (url);
  }

  //********* Cropping  *********/
  function cropInit() {
    cr = new Croppie(crpp, {
      viewport: {
        width: img_w,
        height: img_h
      },
      boundary: {
        width: img_w,
        height: img_h
      },
      mouseWheelZoom: false,
      enableOrientation: true
    });
    bindCropImg();
  }
  function bindCropImg() {
    cr.bind({
      url: cr_img
    })
  }
  function cropCancel() {
    if (bg_pld.style.display == "none") {
      bg_pld.style.display = "inline";
      crop.style.display = "none";
      result.style.display = "none";
      wllp_file.value = "";
      isCrop = 0;
    }
  }
  function cropResult() {
    if (!isCrop) {
      isCrop = 1;
      cr.result({
        type: 'base64', // canvas(base64)|html
        size: '{width:wDevice, height:hDevice}',
        format: 'jpeg', //'jpeg'|'png'|'webp'
        quality: 1 //0~1
      }).then(function (resp) {
        crop.style.display = "none";
        imgRes.src = resp;
        result.style.display = "inline";
      });
    }
  }

  //********  Color picker ******/
  const cp_lrt = document.getElementById("cl_vn");
  var cp_current_el;
  var picker = new Picker({
    parent: document.querySelector('#cp_v'),
    popup: false,
    cancelButton: true,
    onDone: function (color) {
      if (cp_current_el != null && cp_current_el != "bgcl") {
        ntp_bdy.style.setProperty("--c" + cp_current_el, color.hex);
        save_ntpbdy();
      } else {
        if (cp_current_el == "bgcl") {
          ntp_bdy.style.setProperty("--bg-img", "none");
          ntp_bdy.style.setProperty("--bg-cl", color.hex);
          save_ntpbdy();
        } else {
          document.querySelector("meta[name=theme-color]").setAttribute("content", color.hex);
          document.getElementById("sett_mtc").style.background = color.hex;
          localStorage.ntp_mtc = color.hex;
        }

      }
      cp_lrt.classList.toggle("show-lrt");
    }
  });
  function f_cp_mtc() {
    cp_current_el = null;
    picker.setColor(document.getElementById("sett_mtc").style.background, true);
    cp_lrt.classList.toggle("show-lrt");
  }
  function f_cp_bg() {
    cp_current_el = "bgcl";
    let color = getComputedStyle(ntp_bdy).getPropertyValue("--bg-cl");
    picker.setColor(color, true);
    cp_lrt.classList.toggle("show-lrt");
  }
  function f_cp_rgb(t) {
    cp_current_el = t;
    let color = getComputedStyle(ntp_bdy).getPropertyValue("--c" + t);
    picker.setColor(color, true);
    cp_lrt.classList.toggle("show-lrt");
  }
  function f_close_cl() {
    cp_lrt.classList.toggle("show-lrt");
  }
}
