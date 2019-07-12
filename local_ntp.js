//NTP 
//Functions for localstorage store and get
function localStore(key, obj) {
  return window.localStorage.setItem(key, JSON.stringify(obj));
}
function localGet(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
//Function to reset NTP
function reset_page() {
  if (confirm("This will reset all the homepage back to default, are you sure ?")) {
    localStorage.clear();
    location.reload();
  }
}
//Function to add log of errors
function addLogS(msg) {
  //Add to div
  var div = document.getElementById("logC_section");
  div.innerHTML += msg + "<br>\r\n";
  //Cache the log 
  localStore("cached-logC", div.innerHTML);
}
if (window.chrome.embeddedSearch.newTabPage.isIncognito) {
  document.body.style.backgroundColor = 'black';
  document.getElementById('incognito').style.display = 'inline';
  document.getElementById('myNav').style.display = 'none';
  document.getElementById('ntp-contents').style.display = 'none';
} else {
  var root = document.documentElement;
  var kiwiIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAABdpSURBVHhe3Zt7rOVXVcfXOfeccx9z753pzHQefSotQ6GlNGApNhZIWgxKKw1WI9FoUhMxKH3Qf8QQSTQSDUQUMTFUYxVFjEQjvmqwNfZBpIWxPCxQlD5pmbbMdGbu65x7zrl+P9+19zmnpZ1OMZHe2ffs39577bXX3uv7W2vt/fudcxvvffTrG6HkSyk3dGmoxl/WoOuvURjcogGvCTH0tfbkmGGp09hobMRQvIXilDxDU4YTcqnW+cfzuDC/+xvisDxGlYXVtvqyDr3OYFIdnfy+Jl+24LEEjyE1PYloNcNZFwci4z4NGE62kxe6+0o7aZkbhW5pAy1DbeHkPgBJnlqyDvjho+BSxpMRXfpM1x1JfmQWBpRSe8PCUxZddQ6nQoffNwx++kY82c55NqJZB4yE6DIsE9CuOVdYB1JKuBYpLndRS+bsH43DtODVXbWVOI9BQEYKqAo9U07WzZ9Ds87clCYyhjrjs+1hro9zHVP5M9MxrgNujtNFBtFU1QNzcDJgkJWRLHGZSr+Vwpr402QNj4cZHhaH8AKCeXJhqRDjUz7jLF31vCmFh7p4oKUVFhlqs7psIweam2X+7HNGtoq0+hzvVLpzDuZj/VVWjs81oB8uVifV1YpTK5MhOJlFhM+zIESLp6YLfZWPYXUB8OU4ciqbHVoQIpIlKyI0Gk1n00pJ20NQHDkQvQ5uYVVcDKKhaK5bXF672L22LAGh6sBaK9/QPJILY6F7DDTG/eqDX1cbSqass7Ck1b7KQUk2IBOUBDlprmk8N4TSfSamUsP+MAaDgeMSeahVprLwaEjhjSZZnymVraloUIpmXhQz93h2SmojehE4DszjMUPfvTEvCb6U0FR/ymy854H76rpKwjpyGrOwmNLznWXpKwQK8misUDRtENHv9WO4rh2lrwZi3a9SDKMZVABqHW+LSLIpKNyYkqW1mzE13TZ4dBqwwkca8dcJRrSku216ApQUkm6WrhqFsTkJKl3V8ELxOyqYIivlLtU+9ydv0iHgv9AYl30ZE5giYtAdRu/wenQPr8VgVQANtHl6e5ZmDGeMKo4zzKnW02JKdhe+4layuMHKILqH1qL7VDcGPQEOGzLgQwfWpNJuVWiZS120STe0y5lXY1TgdpTIaSbKmSs42c5qrY/8ngWIbwxgGVd59Rl0pcBTa7G+tC6FWJWIJMthco2HXxPYVSgxB8umXRaNbGY1jTH0I6usRdisH+nFmsAaak7oORsDxvyWWTKjUwdVYEZeKUfA0leyzkEq3eBOslANGNEye1Gjei7Biy40ZxYnMLqHu9FfETCiYS1jgNUuJXcIGu4y1W7F1Gy79OkySmMlmF9SUgZlrXMpbra+1IuegArFt5yTjE7qJ5U6QI/WnuSSAZRMPYFFrqIxXATJBJK2Sb6IpuxJRKiBrfK4pKLdZl2g9I6sqS0CuxKTmCUntvCmAJlpR2frdExvnY323LTbU52paE63irxJBRidJR+DAyGbTsmnHs1JYO3JndeXe4UZRSWDuQtgSSttrIXhbmuIeSjV9hgAmjBzzgE+XdJWpwWp7q3QyI8ndB8yVPaeWpWJ9yV5wk3gU7ygMSXlO4sz0drSkcVoN4JH1jbEK9jBVDZlTZZp2epnXWXBI/dSXyozBnGsTFmfqoO1gd0O/lSa8So0rytVDoVku595yZW38DXHW2DuXhnEcgGe3D11AjXqJHz6eceyidWIjwFs3+JtzQiYhVm7kScHELZ1+LVwq4MCzG0wqYmKEDLzqQHHWBFKwFKp7JvnBTDOq7A85uly43A52YHd0XK4FDmuk8sYNXxYrHQlP2o4Jijn4MyeE0EiWhkvoPRJGFt290hXhKTROYRHltEUIFgMJQtJWVqC5SGrDJMSA8npr/XlFuu5RK3BFmaZmTNmQWPxzKEV6DzUmJJrkjkjtaQKIFcdLA3rVgDXEYO2b1KRM9anlPS5H1pm2hmDaFeiKilkrBiXLCgTnPUlgWON1HZnIt+Zkysp6KYs0VmYSrPCA131wSrbf9fBlaDuOUqfLWFiDR5NnwBoKl5Nb1P8mp+O1lzHcaw9q6yyIxondstR9o2Q2/d0Iwe98kwPzRmmrAPEmK4PZaHpUaMQdEFA+ilNJgJphSmYReeEuSGT7UupmuCzMKXOgqxGdxOzJmiva2EAgCtaSc5AqqFof5XAU8FjHmTl3PmUXRT03IyRywr4loJ6bac7iJesORtNgbc4a3DNY11UMUiyJHhYR5nHY9XveTyf9GM+1etNGp3YbDV0qm2ZnlytOoBCfL2jXdfDwlAwJ2toh2KhveWu4xLnEuLKBtamMWuKBwDb1w6D5bDOND3mzfktmLmpl7lzXuQ3tNtppxMw9cG2AgkvyXUl3DuPGPSniszTY17iIMOR7Xm0brfrzVKS/OqCsqAExkzOaluGWZ0sSMkxx505mHpFHxP2iZkDmx8yWWBxP5J5BiNTHy3I/SxUxWgdXCihKwtozkrmgd/z5xjWDlDmK20ym4MtlpuktkFX6h5ZdZlWlPOQbcHcKMZTZw7VpUkyQ6zMZM9ZmNUrl5GrMFl1E2UuPGhmS5By10o/yYrW5DlYVC7U2iBZLF6UWpLuih833KsSBlknwbgCaB5KpXqDLMdt5tBHa+3My5II5nUQV9F9TqI+mj/LKsul5qJsvPuL9+W6Um4uyjltyHUJ7S3plIobMajwIsVKuzUBDNmNpHgCpKkAljquoRX4TplW+ZJGaevTgNZCR7ENF06e8crKVResqE/WoFoOVHIDV+TerCePNMr67Dx5MWZ0JoNeRCjnCgBmyEWfxvVf+Jpu0jOVxBp0TZLAUdwpi6vvgpOrCGScaPku2F3ZJ5ollzFumU818ZVekeSK45b+VHIHBUprTo8ho/GknINWT8r3eLwZyHVFe9n8ltgn1zpjdiZO0662Z6YTJ7XbAkKx6xnpw3ffG/866EfHsiXPwuvsJNak6/X33Ke5IYqxXCsLuA0VN9bXtA1LkBVISUWhyp2T1DSSoKKSKXN6wMm5amawAVCDdz7NVsvbOfU6n/s1z7p2olWBsrLej1dum4+LdyzGhdsX4/T5OfNl0hjGMVRWX9Onv/pAfEr5lvsfi1md7rfv2hYnnXFqvpsye5nLV0Roxmv/82tqp5/SQc47qVKy1xT5x4aha35qywnzXtei123Ww1BVfQRjnWDVP6VFtqRsy/FAfZNzic727JdiPIZwR/mDRwyMR/6qgDkiUF6xOBdv2bsjLlUerbS4U01QHbOUvvzNJ+Km/V+Lf/z6QzElvhkdE2ZkVX60Uf+WXYsxv3t3DPoDjWPVRao66W9c93lZkFZdFwORDCo+EK4mQKTRIOrKmPeyTqltMbx2z7Y4Z+u87uRsLOrutIXuSr8fB7vr8YB2ji8dPBr7n3gqOnKbeQ5103IdgaI1O02CVi9s58ta+KqAufK0XfH279sd8x0OoRlbytBRmgTmr/d/NX7/zi/GE2u9WNB8s5rPYUJrbnDyJp5q3W3OVnOzMb9rh44lsiSP9hSuN64VQLQyAkAsLqC73VvWlsjOpT56QReOdQk6pJPwRQLlJ846Jc4+ad49mYpkUgE2UzbuPHAoPv7ggTiw2hOQxBcRGaKyDmM9AE+M+dnv3xtvO3N30vV0S/D1bjmRaFVgbrz9C/Gh2++JluLOPCdsrFJgEM94NOkTLqRbExnQZUk8RDdb7ZjfmSBh+zU1rrlbAJU0qij50HeUnSvjRRp+xGHdkdP0OPFrF+2LrQqCjPLB7VlSuslYISsiefju/icPxwf/60Gd2xoxKyVYMK7UlcUc7vbjqjN3xdX7TkWKFv2d1lLTVAHmo7fdE7/77/dEW9a7MDOt50BiGMcDxQnlRkNztDWHzmEDrIg14da6622fmfQY0+7E3PaTPB/Ja7/mrvE7aSoGQuMGWiTvkX2L1UHfgaXV+IXzzozLz9pjmg9oz5EQXstn3nHSVAHqE//zWPzLN78dBwR8R3f0dSdvjWtecVrMKU5MmvwzUx1/670PxA1/e1sM1F6UK0355T4WQ1wTOMVKuDtYEm2eI6Hl7ipZsmReyTAZp/WZxW0ykJy78a7PJkCokDaSDtXVI4MDhIQMZOpPLq/F77zh3HiJdo48HD53qpZDejZwaqLHSrg2kbQ4tu3nSljNsmLjz/zJP8e9Tx6KnQtbosVLN9ENDtnASC6gaA1Nlawael/uzc3NtcHT0KFy1toTqLCk6YV5e1Ge/ER00BOBUyX6D/WAyflkoN3jSSH+4Tee97zgVGCq1RwLHBILwtz7CuZstbV8LnCwGsC56Y4vxfm/+bF4dHkl9mxbiA5vJRVzcCsfEQQQB8tGs6XMOngvqLWwHsnmNUwGPSxIWU9HwMAOiyvyzUv3yLJmFLAVFBp5YNSitXshiL4nZUnvufDsOGPrlue1HFIF54Wkyn+scQDDen7sI38TH7j183HqzsWY04GwJZcAFL/bBhxAwpKkqA3TuikZHHwjz1kGB4YyJ08LDPBhV3bDgzabVNMIkjV5gqI6QVFYrCgOXXLK9rjo1O3Pazm2wO8CnONJgLP/G4/GOe+7KR5f6cbJOk60OMsIlAbgKN6gYH+17/jSU9nn6yBuuKyHNw84smxKa1Rda2Sd7NYFsthYByD1Sf/8hhdPkothWhqVwoyBlJVb0bkqgG646GyBdWxwjuVS1S3Iz9J9zAQ7437v5rviqj/+p9i1fSFmtXM2CzhYCq5EOMDqUcExR2v3GY4XcQCgif21EoDAI5DY8p08CAMxp5rwZR1AJV0M4DORAWhJgezq809PGb4+PR2P1XCCPqw7/iufuDV+++8/o7UfP0jwAcDVH/2H+MPPfDnOOHmbzjS4EDkVJOA2iRmsA5WsLCktAGVG38tZCUp2L3EYCMYk3R4kmtsT75D8+yADNHKxtKCuTPTyfXuf1XomgXkucJzU96YP/FXcct/D8fG7vhLv/NObDdLxJPgue/9fxuceeiJ2KxAbGGIMwVegZPCVG4i3rXNPixM2O+JQWakqbrBcU93rVQM3wtIAxv0iWk21AYfayDVtCSBDp3o0eE2u9UOnbzej5ykJUAyo0jGBUdL6Y12PCAe1HS/oRLtty0x86ZtPlt5jJ9zqk/9xbzx8eCm26tmLcwo7k62mgmNLwAk0kdZOkAYo3gFNyQVZJkoOdJbzGFtH6sgYA+BSxQSdZN2wLtWb3v6c9RFQWMyqrOeSM3kYFK2AMpmfDxwSmOMSbz7/rDhwdCUeObwS77z0NaX3+dM3Di3Foo4VfAlgV/KWLSXJ3Ne6BDaVopDvpjKHvqlOR2uVsrIM3mURpzTYY4Ei4QCYUrqeVMcoSvH69IQy9iSVnAm6uvMX7F4sRNEmgDkecGriTPORn74s/uznfzT+7YafjLdf9HLTjiede9rO6Gk9mCJP+wZGc3vHFbnuQI49VoZUrALXgB9G+sTLG9GeDrsE4wpO7TMFea4DjhIWKvDtYvVXEODBqbklxhn5dF/17waYyQQgr9HD5hk7Fo8bHPje8sqXxA49ZS+v9Q0CKc9pCUC1mlSGS7UMFNMDtd9hJc3jqEthHlYZZZrGWYItBlZf1ZdtdB6fg8BIgod6/Nq1ZdqM/xdgJhOnZYB/IQlXv/W6K+NNLztdO2EvDi7LArR1F0gMkusGCiBU1R+nYN45pzVILwIyfwaRmsYBFu3C41TkWK7xSHCf9usOBqHIrA5e3+vEsxIPjL/xlgvj7uuvjBuvujh+QG732OHlWOWkT/K6UTgV9/p1SERZ31gAcJ8SVf35qyhlxySIFCqbITd2m7Epk7ofNXIiFqRC+VhP6f+fiaXhbuQLTt0RH7ziwvjcuy6PS1+yJx47tBocllN9tNeOtQ4BSnEh6FZPFAFprXTpHlXQFq9BxaJkZQpadsEEeowFzlwaYlKJKR71j5FeXMluKqA62u7f98Ovijve+abYqyfwxw8uSeHVWFfOX5slOBl0aelPumXMKdZWYpMtzKiBj3ZJaEr5DJ99htXbuwgEZImIb018tfxiS7x7BqhFPcH/xdsvjvde+so4cGQt3zQWpbEC68dFrezRH7oWxQGLIuONRky1Sp+yDAXzhb98N59ESkBq68T6yLeP5kupF2kaSAGAetsFZ8Yd1705+opLq7iNrQMkBIisBZ0cTwDK7kdvjVtJ5+NXthqGWyeA+dpHB0UaWFDpkDlOC83PPnRQA5nsxZ0Aabt23Tvf/SOxUyfpJb4Blh54gsFBe9/4Yi30QFfbhiGgmg2+N0u3Mh1QGKCPD4oWIKIPhBLINw83f/UJL2AzJOITt/tT73hj7Nu5EMurAzVRNsEhjQAj1pKoA56GTrX4xoPALETAAx6P9ZNaeRbzIDejpZPrNw6uxeNPLb2o3WwyEZs4Fnzs5y6OPfPTep5UwLaS+khhHqlsOeJNkLLtnYsXaAImrUe5lPDlrztEqOc4ROCyW7VDfOiW/xbhxe9mNdkzBNLfveP10day1/1lICG7gKHSoKGgSruYtnf6R54kGQBFtouNCQxiGlIzZoTq7Q8ejvsPPKWn680FEtp++pdeH4e0Gw94lSrdHJTdh5dIV5W4FE/+GEe1mqwkgOSmzUoV3CyticHg3oi92xfiF/98f7Yhb5IEKJ12K278qVfHt/iROcAAApZCXaGkhpWW4o/7BEwaS4aZBAsLAhjOVwKHMQkQT89TjkXN6em49mN3yRK/948fLySxu73urJ3x1vP2xgqPH9ILL+EZy3rq0upM+9HDoBGLAApgCjiUfh9kqwJBj1SHLwJKoCxumYv9jxyJP/j0V/wiazOloeLRb73tvOgpFmFVefNTV1wO97L1SO/8BS4WlCUXSsPJAGNSiDWg+aFNR/BdO7bGH912f6ys9TbNrkZCF9L7r3h5HOT/RjAAAMEFp2fzx6XWvYQW64+lJY12+VYjrcj7vxFFbIn+IN3qxElb5+OTdz8s8uYJ2CRc7c3n7Yldc+1Y12mb7935yshB1fhQZt0l+k+0fVAcISuUMlhn55CIjxUpz83OxUN6gt6caSN+/YqXxqGj+SPUtmJP6iv1it60TXBWnbby6H2QMxYkYLKuwSplQ+IErEbsXNyi+uZLnLR/8OydcbKsqNmetotlMJauMBic0i5W5LayD4oQGAAwtYNMAWDEpK7M85J9vMhn9GZMG/HLl50VS7zCFUB5EAQo9HN3ySXcAJRyPvMrV3BwN3scrsZpnXYB79xTeK8M4+ZLfJf346/eE6sCyG8VbSXVWhIMB2iUd5vSFlTjjlqUTxukj4TxLvi1p29lnk2bbABKl+3bFms9frSZViQtEwvpbEuCMgEez/hqQFAbHzRYOcC+qgEAdMHp/MzOEjZx2oi3vupkHVd0cMQTip5pNbWdwKWFaZunr5oXhDxtwsFHdVvQIM7Zw89sYd68CTd7w8u2y83yTDQCQzpXvcf6k73Ni1CQHCEKk9spBIBeuls7mNHcvAmdcaHz9m6JXo9wAgjFtSjR323cC6DsYuqs4GAxaqc1iSRACGgDnTi3zLSP+bO4zZQuPmurb/roP38qBtK/updq7mvWHcpuhsWYgW9UcxDvfnfM8UryREkbcf5p87IgtmgpCRiAY6tB9wqSzEV1n6RtKYBSgnQ+cqR78U3rttkTCCCBcs7eOb/kr2EEe8FaAGkck5LXuxg+59eQhQlgnQt4M7yeO0ES+pyyfc6/f7LFoDNAWffMCQ54yIJsNeIyjQGTWUQHMgScIAk9SScpbOTLfjWsp8pSz6yL2g7S1VLSrcoASmW2+RMx7Vro5FOBgSDeiFiNYVTWII0VDbCktKZhiV8VrCX+AfcES8RVjCJ1xJ1QWCUKO9xkyJEFZcyhC9Tsf64nE3+HVxSpT7DU4YtU3XefedC5lhPgGKB6WAJJWw8MrpcfTwnDxw91kXlCJX4rbdVLaKmAJECUtB2kkylzgoPbwUhfngkasbza8w8zT5S01h0qvqhiYNAV3Z8OTgwj/hcdE6bWlRktMwAAAABJRU5ErkJggg==";
  var patternsURI = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAIVBMVEUAAABISFNPT1BKSk8AAABRUVlQUFdfX2BTU1xLS1BISFIW5OYtAAAAC3RSTlMVNUBFACUqGyBAOiq8620AAAESSURBVHjajdPBDoMgFAXRSy1I/f8PbmKtNLN4HVYaCfMSjjlXe2x5nit9jOy936+tZd/n97W9tlzr3Dmxc947x3HkWih8EjxzHdva9YWF9NGyVjE1ChntuJ7rqVnIHGN9KqZm4WdnPTULa/2ZmgWcyanXrbBQnIlbQaE4s7RUnVlbsj5ZiPaJQrRPFJRP/1cJS8Kn/quUJeHT/1XOkvbJgvbJgvbJgvbJgvbJgvfJgvXJQrRPFKJ9ouB9smB9shDtE4VonyhE+0Qh2icK0T5R8D5ZsD5ZiPaJQrRPFLxPFqxPFqJ9ohDtEwXvkwXrk4VYn7yVWJ+8lVifvJVYn7yVWJ+cxfvkLNYnZ4n1yVlifXKWNy8PJIyie6gNAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATklEQVQ4y2NgAIInz17YMqABYsUo0kx1A4lW+PTZi7j7Dx+lUWzztes30wbYZmyAWJuxGkKqzSj8oWczzoAk2mZshgyczUDNuqTaDOMDADz1vO3QVThgAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAGklEQVR4AWNYJYoK92ihwpGiAF0AXcMIUQAAbIfSgRmCFqkAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAV1BMVEUAAAAAAAAAAAAAAAAuLi47OztQUFBVVVVhYWFqampsbGx8fHx/f3+CgoKCgoKFhYWHh4eLi4uNjY2Ojo6Pj4+SkpKTk5OTk5OTk5OUlJSUlJSUlJSUlJRKk3zDAAAAHXRSTlMAAwUICw0QEhUYGicqLS8yNUJKT1lucXR2eXyBg9SYh8YAAADDSURBVBgZBcHBYRsBDAPBBUi5Av/cf2fpIYpyBDyjn4dpwst/UAHR/fvpkvr9peGcdm6+Pro8SvqPDgvCR8GHjFwfL9m1SimHkqJUtuoYMNWQoMdCJwzB0NF5fcUcYpCkjltLKKZ3OlS1xb47oLTy+TpEAADwvYJj8IrCpHP3nwRXr1U3lhrnPcd8mFhbHWIEGIZjpanPHKUCGDvwnIqNydA57aRzQxFRK2rPSkxas62jtPghgJRTJRdm16Eo9hUH3PMviNSOOPYHUiwAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAQAAAB0OpaOAAAAHElEQVR4AWNgYDAONQZiBhABhEAGXCQUxiCsBgC8qgzSEgW+UwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAA9UlEQVR4AV2Qoc+DMBDFn6vDfQ4307sykg5BEEvmCAaHq8MtqZib41//7qVbwppLLtD3a+/egzwFsmtSsJbGCizdqGiCYmz7W29dkz9KaRouA6KO7QgjKYeZgjx1401+hzUYohv4eFhNfJH/VEvIYBDAcKEsyM6GvP1bE/cgEjUCEbL74/6XnYkEX/7g/9KUa3aPswXEukeHDv2NJ3RAEHdcJz5VDq8TIT7vbfR1ys6cZ5eRv743Lv3NJbulASfKXnyzD1UuqHwnTb+5MOCT77Cyn3NB7TtWuaD2LVUukB/fY0vwnAvCHD6+o4bVLLswc82CdY9/r1ttojHJ9EoAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAbUlEQVR4AaWSUQqAMAxDc7NC/fJQXsEz+yF7rRDYcIT+pOsjEXUGktPYiQeBiV7vuHiYd6rMPnvE9Yzxm+gyctBnm+jEkYzNup+X9Q1B5yISHZMKvaISzYiBDHE5o2utCbF+KJ9x7NeJ7uO6jA/gvK6tT/aV8gAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAXBAMAAACG4mBhAAAALVBMVEW/v7/GxsbBwcHAwMDHx8fDw8PGxsbHx8fExMTExMS8vLzGxsbIyMi6urq3t7fYOU9pAAAAD3RSTlMwWjo1YEBVZUpFKlBqJSCof7U2AAACD0lEQVR4Xh2RTWsaURiFX2a4kNFNYx3HoS7GxlprKdw6JUwUF5JJVOzi3ipJoCun2pHQzQQZEsxiUhOErhSHLFwZs7ETAn4VS5ddSKGbQlelm/yU3mb/vJznPQccv8yd1VHEEILHaqfo2z/yTENYB1jo2fEKUxuft7Vc9/Fa+GBXcY/BX3r7yV/kUd7g1LMZ9x73dEPQ29B5cB1adDXi2ulx07s5nYxtxS2kobc97JzwSwNJM5Tz6GUJvxF0ZwhbpbLWzoR2FWpvuF/D3nIOboHvAz4vAJ46FQNFAsLpO2852dIdrQVzQZ8jKXtjkT1buSSJ0AbDOzkoYbelLmfXpjikRoqlMBmt8AzMuRCcZ0LluOW7OhnS/zK+/e3fEG3hRCG1kPllP1ZHkiE0Hby54wMU/PYrTzIWyTy6d+o11Au+NgNCd1SL8EtZlQyGf7Zg3BxsriCAQuci6rNqNIYn137eVqYyFwGrTHOEFryXRcxwnqtdNNQaiYIkoi/IrL74+wMoe6D7PP/QkyYjiK82gIqJOhXvZWR+OkDrSho4SUx3DkdBW2F4r1HtPuGmBlcHErf7NOC5IgoaQg6eisP4KhmzQEyxhGpbIHtF7BZvX4mcGRitTyGYjFsKbWH0gfzRHVTtRq1k7GgErwcjk0XOR1L6ihUpc7UZlz+8g7CqsIMKG+XjwtGa3fj3bMxWDv4B8aOpHqtLHxYAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAXBAMAAACG4mBhAAAALVBMVEVAQEA5OTk+Pj4/Pz84ODg8PDw5OTk4ODg7Ozs7OztDQ0M5OTk3NzdFRUVISEi5S1dSAAAAD3RSTlMwWjo1YEBVZUpFKlBqJSCof7U2AAACDklEQVR4Xh2RwWvaYBiHXxI+aPSyOmMa5iGuznWOwTczSqp4kKVVcYfvm9IWdjLTpZRdUiS02EM6W4SdFIOHnqy9uJSCGkfGjjvIYJfBTmOX/Sn71vvz8jz8XnDCMnfWRHFDiB6r3XJo78gzDWEVYKHnJ0tMbXze0Qq9hytr+zuKewzhypuP4TKPiganns25d7ivG4Lege6969iipxHXzk5a3s3pdGIrbikL/Zej7gkfGEiao4JHhxX8WtCdEWxVqlonF9tRqL3uflnzAh/cEj8AfF4CPHNqBopHhNO3XjDd0h2tDb6g+0jK31hk11aGZCO2zvBuASrYbavB/NoUR9TIMAuL0UpPwPSFqJ+LVVNW6OpkRP/HhPZe/oJEG2+UMguZDwbJJpIMoeXgze0QoOjXn0WSs0juwV1T/0C94BtzIHRbtQgfyKpkMPyTBZPW5eYSIih2LqIBm0ZjeHrlx21tJnNxsKq0QGjJe17GDOe5xsWB2iAJkET0GZn1Z3++A4sZ9p4W73vSdAyp5TpQcaNJxbsYmZ9dolUlC5wkZruH46itMLx/UO894mYG1wSSsgc04rkiihpCAR6Lo9QynbRAzDBDvSOQ3TJ2y7cvRM6MjFdnEE2nLIW2MXpPfusOqvcSVjp5NIZXl2OTKf2xlL1iQ8pcY84VD//Cmqqwgxp7yoeFo7V6qW/5pK3s/wPxo6keqhNsswAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAX0lEQVQY02PIiAgXIIQdbG0SGMAEHgCSd7a382Kws7Gux6UYJO7m5moFwmCF2BSD+B5OjgYwzBAYGyOKrhhEB3i4KyBjBmwOx+YhrA7H60Fkh+P0ILrDsXoQm8OxeRAA3tdK4XWWWjsAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAyCAMAAADyWtKhAAAAOVBMVEXExMT////+/v7ExMTBwcHDw8P9/f28vLz8/Py3t7efn5+zs7O6urrGxsbAwMCLi4u/v7+qqqozMzMczw67AAAAE3RSTlM7AAA3LjMAIgAaDRYeQCoJJhEEbIlemwAAAbFJREFUeF7tls2O5CAMhL/CNj8hIUm//8OuLPVoWqvRzvRtD8MBIWxTJSiXwO1WdZsqOUnlHMvD1ziLpIkXTfOq2xxW1QM2deNWmc7H8Fl0Y10bPFQXbEVqRNUJvS8g2pijBbB6h1M1aFLZSCCOXdrxM8CzWBlyiNPJ0EHSo54XeFU1PGBkZik5lwHhWFV1uM6KG3iXGhjckrbm4W2TdIOR+N3BHMP2mtsGDKlfcBwHXF0agHFLdbdcnDVPMMJYRT3A97k7RFdZWGCJVs8bSeoNYhibygUJo7rDVbRhI6B1SaL0rQV4H0TGGJKKEj9rg9EdrG294EYuq66jSQ0vqi1aVXFy47hUmwHmmJnvD6nEMTK+q1wHx1W0Z904okiP3c2MWCP5Ze58FgSWfObxMSX/seKdcz/5Lr7ky/rkm/dgP7uHd+73+W7zn+82n+/21MPEDph/6WHCYcynHl51xhc640Vnr/pdX+h3vej3nb54q9/spY83lRl8jJhF20sfG8GdhVMpiMR+jBWpkkeRnppI2Jt4zeW7XPuxl9h/6iW/XvLrJb9ewo+9hNe/Bt/8Nf4AS3cmb0JgjvwAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAANCAMAAACTkM4rAAAAM1BMVEXDw8O/v7+6urq8vLzAwMC3t7fBwcGqqqrExMSfn5/ExMSzs7PGxsYzMzOLi4vGxsbGxsZAp0WNAAAAEXRSTlNAMCUqNSA6FUUQShtQBQtaVftufO4AAACMSURBVAjXBcGHQcAwEASwK19tB9h/WiQEVy/bHreOVxfgie8eOjSxPUqguMH7hPFqPcZp8cTN31mZzDxIRFZESShVcoQbBwzk1/mOC9mo7Zlq03fPQ1+hbGLLDFVQQYIYbQ6MmP7JU8ZwlfXhIbKRjYeQIko9VjqLd7B1XEbsD0AQ9aFbuFDTTcQf1/9STgSmXgY0bAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMAgMAAAC6+bm4AAAACVBMVEUAAAA6OjoRERF2CL9MAAAAA3RSTlMYagB3UbU7AAAAKUlEQVR4Xu3MMQEAAAjDsD48qEMiUhEwAxyNgFCJTUyi08/Pz8/Pz+8AYZNnpzQ2VbkAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAUCAYAAADLP76nAAAAlUlEQVRIx+2VMQoFIQxE50a5/3EEQUH9kkZRUvxOdl3cdhUylYSXIsjwICIkIoRLjDHkvacY423ee6fdeMyx1t6GIYQntCOfUhoXMjMx8wDny7finXOU0m8MWmvjXWslAMg50678I9cFACilvH7x5/wpZV3x55V15o8p64I/pqxv/BllXfFqYjWxmlhNrCZWE6uJP+T/5sS+zrENYFQAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAV1BMVEXKysrHx8fJycnKysrIyMjKysrGxsbJycnJycnHx8fLy8vKysrJycnIyMjGxsbExMTLy8vLy8vJycnKysrKysrLy8vExMTLy8vBwcHLy8vDw8PAwMDLy8smPLGjAAAAHXRSTlNTMENNOFAtRUAzWFU9NSslXVs7S0hgI2MdZSAbaIddL18AAANVSURBVHheJZNHll1ZDMNIhZvjSz+497/OdrnmoAY4EHgAfTZc+bhXC+gnhqSGhFza3EwfCxBscMrybNhxEmLlGIulxyxO1fxqhBDylhVHx9ZOqZJr+iJdZ4et44tQU0DKBX+0Tisv7+FQZavynAiruyUPrlIDpNcG4Dk/J0dXtQYP48REouaSBibyFYk4gadszgZPptpDXDGgsFrEEJXawarfE7Ns9uK9n35QINNKpUSrR1jBGZsgtIKz0IplxTGaC22/Ig/Qdbi0ajXX9NSMTavdVnyOojnt++RIYEQ4MLdFS6Bqx8Ha0+K7ImfsMzNVtVgZVnYnbKcvWMBibeVnyfRbO5srM/TharkETw08/QDk13uau9owjf1w9IHV+UrNc5GB6R0g4oM4PpjdvTXVPBLilFsCcsRImrahCULyuTGlmil+1Gk+9i1TY1p93AEm6JCxMzAFlNpGqzKz7zMEdXocSFatwMCoufxQEYFQHvsDoxQh8DTMbWLY8taAlkCtXy7LuE/OrpoN8TkW/SQOgIIEglcJfNFeZw4JaKaeRyxMO2hrkKeGy6LIYnjl4yOhIVq/3ChLKC8TZ8FIattAl7HN/lKqZoqDzSVY2RbAE+AKbilJZfN5/1BU9Offc5TXSdbUSkfpV7Xa0cbKW/4VLW+9JcuuEqgwq8fAxcLfDqRjQnJpf9Sn7SLMEULBMYC5Y4f9XGAxjbnKG/rU10UmlZxqHBkRBQHWwBMNdMKH1nkjTIGYIIahxTI8RLV1PJhuKrGOXmZFaEUtuQT6kkc2mEDVgSstc0LCyucOqWZzzdlh89h3gzpjCfSJLC1ipMjCBMo6RqoWrtcrBiJ1RQjLHL10pFFsSa+MdYx19XRvCUMqrJzjWI11SvutxQModfA2okhgrFcG+HWQL0n1RwtY23WlksMr55dmRiQa8EjR6Z84PYszwiqdJX1L6/+ds7nkBCWWhl6LTdVjHaNMtRijD734d6puAg1BMXu9ld2VHkdNbRmox8CscapSQepKWB/Po8EIjANz95ak0KPUHwr+7bXNhDieA56lyPtY/NUiAxM5eoC/02LbN4YU712RA1ZIJVytgRIVhuD4tvX8+9gamRUWEtKQ2wQs8b2CUi3W0O9xfozxfx+JLgq5a14TAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAAQElEQVR4ARXEsQnFMBAFMBUfXnVFwFWGSHWdF8h8XsCj/mAEAgbs0kA8aIDgNXbZR5nOARr5/zSl17UIMAVwywex1QiXwasx9AAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAMCAQAAADrXgSlAAAAQElEQVR4AWPg5eLlUnZXdldJU0lD5SgZKxmDBFQLVAtQOcq2yrYqMUDIoMKAyoEpAQmickBGggQwOTAlIAEUDgB6yxiliUh3swAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAQAAACLBYanAAAAbklEQVR4Ac2SUQqAQBBCvdZcxfsfJNo+HiGU9VNIMLpl4+xIGo8WPKcaRciHBOdRSvlZmMNRQqIGO13gGM5LACfg3ummJ/O7dHqUzv9KB4q7K7eg3KdiM5FA9pSBcyjpAF44Qa96inSF08fpqolvjA6+VCjT/sMAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHUlEQVQIW2NgY2OzYUACYL6+vn4UsgAynwwBEB8ARuIGpsZxGOoAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAQAAADxYuQrAAAAWklEQVQI12NgAAFZBgRQBBGSDJITRRFiPUA+w0RRIIUCkPlGQGiGKq3XI9mo1iHLoIcsqAaltRjQ7URzB9hONHcAAcgVCHtBtqICI4Z6LaA8sp1GMCOQ7QSyAcvLDf4Fs8YtAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAkCAMAAAC+LeqSAAAAM1BMVEX8/PzGxsa/v7+8vLzDw8PGxsaLi4vExMQzMzO6urrAwMC3t7efn5+zs7OqqqrExMTBwcHQoBS8AAAAEXRSTlMAVTAqQFALRQUlNSAQGxVKOk/UpQ0AAADESURBVHhejdHBksMgDANQWcYEAkn7/1+7M1kc7bbTmepk3g0J3h/2G6ycBOkeQkwnQZKdidXJheTYLhykkPQR7eQKnnkde9qAPa5Hr7CSF8xso1cAZlHoE7jQAnmVhkQT4jPGO1awvGAbBLlvf/HMv/PGLb/pEwuT4QdWbKUQDZmSGjdNur9s0JxXQohFZN8TDyrs1waV/+M9oL61gfrWBupbG6hvbXCj6v4GawjVtzZQ38wN1HcmUezzrW9tgGdqtKT2AzbuBedeG9ZWAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAXklEQVQIW2NQ09a/ZmwfLmLg7ivvYBQuwgAEDj7JIgwgQTUdw2tW9mGaIEEQraZjcA0sAVKppmf0FaQSJAhWBCJAkiDVato618DGgADMbJBxMGPBdsE4MAeA7QAaCwCKJiG9lhuUtwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAD1BMVEXg4ODe3t7Z2dnh4eHMzMwfFvLJAAAABXRSTlMpHxQzCglRi48AAAInSURBVHheTZOBjR0xCEQfpgEgDRiUAji5g+u/qNzoS0lmJe9KDwyDvbytmXj4WlhO+9rdSAqwDIe3sFbXN2NzKE77e0/rspyAfu9MJxXvR+APlA8JpydJfzxp7VzrirTpimpI8lMIC+C/zPlRc8L3H2mAmOFcmwBrHAjss1n1hySbgFY4jSSrpgw+PYZ6NaRMhxI5AOGIyOcic/F15bSxONeQ2IAzfZrjCyqj7bG7CZYzE8ffYzEVhuTrumHTFuaAXQvgrfpfc5tL6pu6xluAC5TbqDYDE+Ai1gB+RDIH68AcIGuuv63vS9QkWeGG1JmAW8dmZoAFhyJJlVM6W7+M91DXv0kkhwTqFwqTQBdAI7KJzYq3D0BLAYL0X+cZRqUI+EJyREBDutUksams0oTD3873PTPBf6qL+WO+sUh4bxsdvNP48bW5uoB6toEaMG0IdvEHPBS7ZwKbexo2AIwdrmMB1sqQwNdgiKX4EHhITpKfAkjCAI5X08laKgYCha6GJcID/BW6DifIbd4SBISQBauc7EzeAxzucpxhMT8zk/rZTIR1HMuwgGnqgpfIW3jyLj91txpjAJ5leQE2SbF2qRaJtU4RqACZILN41syFcr1cJOwCPMMSKEgWsT7XRdiMd6JaR3XGsZnrhgSU07pAM8BMQKGVGt/8ITr/FFlG5K1Ny9dGKd4qXP0FD5EFi6PZkEEFMq1I8Qs1ndUwQIbIBQiwCdRg8gfxVEji4SgRmgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAgMAAAAog1vUAAAACVBMVEUAAAABAQETExM20mnVAAAAA3RSTlMOECJvSrphAAABBElEQVR4AWyRwQ3CQAwEJ5/rIVQTyuAfHunmXlRAoaxkMfJJkQ4Dznl3x+G4xlzOxvZ5vZdzMJ7fx3Im+7a2jpNzrINzZ+6r/DnIp7dyg9zsg9Ehel0+bsS1t5KJZOuDSU4Iunz4qC8BU6nLAqZSkgKmUsYCplLxBEylIARMxV8+w/sqoKo+6G0aTGhm5JAM//gARxxHYU3Q3igY0sCIIhYCC49rcUW4PBeJK3bd+CIKsDle8H91N62bwTv5Xxv1QQAAAAQQsH9rAU6DH3CIG9WFbm2Pcyf00PcOn3avFYDDRJgOOcE8fIX8VFCY00r5TlFFPt2NwqXDwFyGjNUlzfBdHo1oSKi9zm79GKMAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAk0lEQVQ4y83TsQmAMBRF0TuAWziOlTOkt0qVRexTOUAaB3AvC78IovLyETTwmgQOFl6AAAxABoot211wjAGYgeW0GYgecLzA9mUPWB7A8gswPYDJA7Y3X1nsrRrs2E4EJlu0u84DBqAHGo7T2F3wgm/uW1BJtApTEpVBNVEZVIv6DlQTlUE1URlUE636D5VEf57eCqJrxu8yn+EZAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAV0lEQVR4AWPg5uaexcDI8B9Ec3JyFhDCpKpnACmGYWI0kKqe9j4AAi0gBtPEaCBZPYggF1NsAYXBR9gCShPAwPuAkgRA30imJR4tKkaLitGiYrSoIAIDAKy7LKCTTHSAAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAQAAAC1QeVaAAAASElEQVQY02NgQALS/5F5Ssg8qa/IUgooUg+QpWRRpA7hNB5VCsV4VANReKjOQDWDgYFIm/G4F7cv8YSNLG4pFCNQeSjq0MwAAPCoHW3Q0Dt9AAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAcCAMAAAD/cKfGAAAASFBMVEU5OTk7OztKSkpKSko5OTU5OTVAQEBAQEA4ODU8PDw5OTU8PDU5OTk8PDxAQDU7Ozs8PDU7OzVKSjRKSjQ5OTk4ODVAQDU7OzWYxDbHAAAAGHRSTlNGLgwAOkYXAFEjACM6ABcAAC4MAAAAAACT/zuUAAACXklEQVR4AWVTgXbbMAhEhCPIUtNqTdL//9PByfXbe6PxJsPBoQOLSFPV22kGV/X7aelusd9cb3rrhoDk03xHb94lj7+/XcdwpHkCxowGhExxQ8+4393RPz5OBmfZ/EP+71qpzR8xIQPtcwDj6+tLV5CJhJd1/Pn+1h5Iv7VPyDHl6XcLJEqSgiTZEHNJJna4YaVjZIeQfHq+eIs52XKiC37J4QNg26qJ1JDXy7ccCpm+a1f/fram3pCAClgBiyOJCJxzX4fwS3CP2aV9plHIzKiuZSTM4/UyCSeUDClXBxJtVgVgR/6bXaW1eKljOVszEjLHDVVdb1Gq4ygTMnkGDKyuw2IoU3yFUWm/95QdFFIhVKaj5xXSCjoCngMckF6p5JPVgtwesn2CzbnNMHtguV+jdIHvTYPspWklIBVlwBGzWmcDWzG2r67MSKfM+Xyqblm1AWvCz/TaZY+8PE3kWb0ucfi5fbcGebzf7wYuwzaZDYcmlDPPGqlVO7d6ALb71wWhHLV2Lxf7R11DJa+fnx+f0fyqrE0m1Y9UreOoAC/04M42cZ0gghegOWqwmz+4K5y5NQIwga0OF+/c3w5ZMWpSA9woUR94VGhIJEE5N82veY/Yo7TU02vmeYFEWliTVJgDuAZX6T0QTSuAxnkspLeJZR73bo+hfr/Ds6ODS7TyAw5pGO5BrI6o5knCNC6kcT9GzIRIfecWfSaew3PY8Z8hVU/ThZklFwQIu9R02St9fYT7uk+Ga7YREIGRfGcY9oFwz3OPLTgBj4mAICL41JGUSIs60xsidImE1Cv+AjGbIgREWQoxAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEUqKiosLCwuLi4xMTErKystLS0qKiopKSkpKSkzMzMpKSkoKCg3NzcoKCgrKysnJydKwFaoAAAAEHRSTlNcQDIqTjlVanEjY3gcf0eVx2e4NwAAAJNJREFUeAHt0SEKwmAAQOEHDrVYdEmTgwXBoCzZ9l9h8HeT2Wa1CUY9gc3qFTyBJ/EKij+DF7yAwfbVx+Nc5kBoVoUi5mugG2Kh+Ci5UtRJkFWKcctLpVi07ERFeUy6Nk/FaLIH+rflRhHmgwO7xz1XkA1Pvdd2Nq2VMQpjlDHqK0YZo4xRxihjFMYoMEb9/qP/ozcE1oO5SZysbgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADAAgMAAAAvsoSUAAAADFBMVEUBAQFBQUFEREQCAgK80sqkAAAABHRSTlMAUkAALNLTQQAAAGxJREFUeF7t06EVwDAMQ0GT7JexPK1nqFcQKcg78KGAwNW9M0k76E6qc2aSdtCd9MSH6MFW0YOtogdbRQ+2Fz7864EHHnjggQceeOCBBx544IEHHnjggQceeOCBBx544IEHHnjggQceeOCBhw/AIyPx4O3WOQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmAQMAAACS83vtAAAABlBMVEU9PT0zMzMr5a4YAAAAAnRSTlMUZvzs3gAAAABzSURBVHgBPc/BCUIxDIDhDBMKuXeECg0uoDvoLhKhiOc3QafQmziRgf/ZW/lI07/iGq4y3fQhNVqcdhkpHykpr13ibeUm+m2j/+VsNeXZ5pKjbSn3Qyzxq6bEZQlnHGGeuwg72Y/wLg0IbXQi9PMXZEvpP7f9RXkNrx9UAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAO0lEQVQY02NgoAVQJkpVcXExH5CSIaAMIj99+nR2PCbLQA1jQFaMbrIyiiI0ZyjjVYSuGGoDUR4kDwAA0u8QeBv9liAAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQBAMAAAD+CqKmAAAAJ1BMVEXNzc3///////////+Kioq6urq6urrAwMCurq6urq6Kior///////9+BMitAAAADXRSTlNKIgsABhEAFgsAAAYR4A9SOgAAAI5JREFUeAFjQAGMgiAAJRmVBJU+2tV0HIx7yMPCoM7IICjCoKOzIf4ZA+PmsNDNNozGRzqVWhkYjY23LNnK2DklOjoMxDHuDGP06Jx5fDdQWbfKqiWMe4w3W8xEtQdiCYRkMA4LZVQ2CXNvZez0YrHfKAC3iiFl1Rq4VQwrNpvDrWLwWlUOt4ohLKMTbhUADaAyw4qOAkgAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAAAPCAMAAABQruQZAAAASFBMVEX///////////////////////////////////9oaGhoaGgQEBD///////////+Hh4cQEBB8fHz///+Hh4eUlJR8fHz///+QkJAYFjeHAAAAGHRSTlMVGRIcDgsAByALAAUDIycVABArACAAMRvrRcTkAAAECElEQVR4AW2U7Y4suQ1DaX0cum/JNTuze5P3f9P0NOY2giAG/I+qMo8oSSuyoovAGDDCmMZ2bkOjx69fulQ70w0EAeDGNJAAmGauAaCBss597pWGamMGYUQjcqeFabh8NdBjhiYwQRAdvZ2KWFIqT6ZWhvL7OcX6KASMyr7++ssUZdpsHS+CAaA/BxDVfpgAmkKlfeeOZBiKApcbw7UsSeECQARFYMBASHvn19rrhNbyQgIMH4Fpispz7hDCYNwPj0LDlQ1gjB0deur0/FTIqowcZSr3vaWNojBmrrn++vj7eYZubN0+KgT4n8LENRS+FmudsyNXINzGGF+B9X8w1+y8pRlE0ZiVqQaCpl4XjDGqcFf3RoigKdeLurH5FMDl5zNL91rVgIEa4GGg4ktnl9Q9BgCKoX8qQwxQCDOYgodpqrXTC55t7w8hnTgejN/KoBn8T+On6tc8tQZTmH4Y05fJls45XppHMRgDfsxnWF5KH8cE/WEWTYP9AwwahEmLQBgocGNDOH1LCIjhSUbKlvpRLKAeAZhgGPzhbwWDC5phsJfOvmthuMJNff6+AgMi9pII4hJgpkxhYABT2AsRckpEZZyjfc5BCPNThmspEIVpho44W4IRxggDwKMIDFeQKPLkzhABNLxGkDFFEUtrRWMA5of4PIwwGXl2rtyr5uylrc/fv80QCIG3Tp7Mhnfe4mghROFrgJpVih2ZVcurlAqNJJ2d5+RXhAXwotuAWa/aFVmlRWD6MzAGoDCydFbWzmUwxjRgMS+PBnwZY4qT99bUtRADeJ8Wcw11mXAzf2xZdG+fVjVtUwAYwxgwIHJ03xKmMKYHiu/4jDfnfO3umKLsF3FfQ2MPCCgGf/7+MCBMAUWuu0U//DAGp46HeqXSNMbUc1IXQQN6h6OmKMwCTLt1lCUCA/MxGIDptkJrUwDAGExTGAADqLKkGlM0wsTDqITAEU289lrDR8052wMUXIVpigEMFAEAgPDDtPN8KVwqgMs0gwlqgrUVhQDTzDNwr/Px9/UG4EU5NIv0iVdGlWsjPKYZRFBa4jIiMEK51205ATDwXv0YPwkXa9T3uY+yo77X0fd9r/62VqooAlGYoX5Gxiy3d72KK0vWhP74wpenJ+K+M9bb1/eRRGPAfP9yWKGM+2vZWoqe1RFrrT77/GvH8bGAovFV8PDHAI18dlkO4N3SKWz76D57CdEYI4rBl/UIjAjwMMyYmqPcBwaKAloK/fhsgD/uSw5Usi1kD2/F4GkCqCfbRnkvuQxQ9L89BoqKhc6J1bIRAMYUMcUm5P7fnODLDKUv1TsnY61iLvPm+WphAyDeWwEwfjRuX3GJcOTJ4+DNE2MK0Doh2f/NExbBwKefU2D8H8SfO2A4p3dXAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAkCAQAAACtIJtXAAABc0lEQVRIx41VIZbFIBCL4z0Eaup21Ao0unf4YlUPwGE49or2FxgCLbjpPEgyaQAAfH7tBpDQL4Ecm+0rDsCxAYimHTlAoF1pB1upuLM9jt+K63AoJIehKQLFTe8orkOXauu9POJ9bA5QCCET2W312MfCja69rZVXu2oOECqqQiaHJyZfnOBQKqQfqF3y2a3wtE6RCXwOx9bvLyFS1zfcAECKY+05wFvijNs1zOIQx5GP2kVygDTDTNR6aWLUkVoO0JFMi06oddQMc+mOF9Zh8lV0U+v01an10jkwHa1jtSkOwD704VSDWMqkxZUYtuuy3rFNRxZJPk1TS6l1El6MvVafrJOo9bRNLaH/wRfdTjHsK9h9m9Cx20Am8lV0q/ifhK2VTLih6IRoavE6vU6Bvx/64PG6vuFW4//poVpwSw8PledPG7fOYyA8NCzS4k4tpdHbBPIqLeYYukC2YXtXPSLwofE/yFtcL1+LTrh1qPeYxeI/Pt5vuBkXfBQAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAADmBAMAAAADyPWpAAAAHlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC3KG9qAAAACnRSTlMEAgEFAAMGBwgJHK6+iAAAAjRJREFUeAHt3DFv00AYxvE3RDGMNZDOwdDd1anQlarsLuX2SEiGEQmJwhcofGymPq+HR3IV4Qzo/5+Qse8XezqdfY3bolr1sXtoF+rzo8/ch+rUja55URQ8PDw8PDw8/H/Ob+tDQ1Wh1qF6d3ClQbczl9sfGtfqfVVF9f5GDf/8Wr3SwZNQn/TfV51akoeHh4eHh4eHh+/Uzs4qq0rpxJ0ZVW1y+hrqZd5nZPaXTqSq8u7PWhWqKeqiqk69Ef8BHh4eHh4eHh7+OPyQ11veLZU2o/ou892ovrkxn+SvD3XQmu7lnZpIye/dIznX6NtOLcnDw8PDw8PDw8MPMxPIon7L/JX8va754qaa9v17tGoy0T61gyb/Iw+6R/K2qJW9UXh4eHh4eHh4+GPzky84R5Wzyp9FTaRQY+ZfoJvWYdc6W1WcNHPmhf18wF2+g4eHh4eHh4eHPw7f61+bTsUBb9Wjqht3ZkJP71Rkm2vVqbOqLG8Ozj6nS3h4eHh4eHh4+OPw1ZVzxW2rqrot6txta7fzz17Hnv1RYT4gtVud5qfPjl+7D11fjwoeHh4eHh4eHn5B3u/W6Q9Yq2wePdVsJrz/gFQ1C6z+Ts6Eh4eHh4eHh4dfkPe7daoaFnjV3oQt+Zx9X7Xqn63+blsFDw8PDw8PDw9/FN7/saShqlCr5CfjV2X3z/czu5JO3Qb44gbtkh8OeHjRKXh4eHh4eHh4+CX5NL+O6t7tdd+765Nfh9pU5fh1qL/F+oNE7tL7IwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOTAwMGYxZC03YWQ1LTRhNmYtYmUzNi1lNTZmYmY2OGY4MDQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkE5Rjc3OEFBOTQzMTFFM0JCM0NCMkM5MDQzRTZCRDEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RThCQUYzQkVBOTM0MTFFM0JCM0NCMkM5MDQzRTZCRDEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YzkwMDBmMWQtN2FkNS00YTZmLWJlMzYtZTU2ZmJmNjhmODA0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmM5MDAwZjFkLTdhZDUtNGE2Zi1iZTM2LWU1NmZiZjY4ZjgwNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/iy6QAAACSSURBVHjadJDBDoJADETr0njGC2ezITGc/VR+Srhy8BOUi5+ATGVKKoEmb9vsTiebOYlIC55gkqW8p9AbO0YbeOEiX0h8exU4zuACruATxOoi0NtGBg863+iinO2uN4053uk4gJLOFXiDDtTgm8KnM7fH6OR/VfmvmgKf1xQ0RDCRLDulm0i2tWYbQz2af30WYACb6x/hdmXlNgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAmCAQAAABKK/zgAAABP0lEQVR4AcRXsXLFMAzSxqbNmzdv/v//ox16r3F90cVIvRw7IRiCY5wfDDaaALBxXFg6nVYCZ2P/QSNknsb+i13ylCU7+/Lqukgsr+oJy/pu2d8HzeW0IMl19gvPyflgEekV6dh57ryZqdO6yw5OzkNPR2xZ7PgaU1cdD3hQ0daNxyIcnpYubGv6ENsaVOGZsiMXo5gKPBrHVoVTHi2m+UEC8dZwmRir/CC9M1wgTBctDFK+rZ43zNh00eIg6ReJvGEgoksjigdJinB95xXRetPr2yoYFsUh+3nCw9JAHxzFsP9c47g0yA+OttC66OzVc9a39RmyHXXxGzq+4e8stPbI/L9W1X+SAFMk600vb6tg2Vc7diAAAAAAIMjfepALIxEkgkSQCJpEkAgSQSJIBIkgESSCRJAIEkEiSASJoAD0zWGDTyzyOQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA5klEQVR42u1WMQ7CMBA7KQNbt27Z2DpmY+MRuY2NrS/Kc4mlng5FIGE6AOIsWbfU7jWtaktHuWcSOfW5yItIImfpGtNtswgBu+GxM2OCqnoh9Bk0D0qfzGAgDEj9zOkdxTd3I+0g9KYDJ0zuBHyByUxgwCww6PO7r2A2Egss0BrpBQBc/IBK6LXWet24mof8NVprBwkEAj8Oz3vrCUYy74tAN5DuC2zejw8wdI5MpyXZF/xP+KRvIDeII9xVOMqYmDvi2iP7gwu4Af0NeWOCXqm+gHeGCVr+79FjRmxG44kKFSfzFbgB2H9a/oMniUIAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAQAAABu4E3oAAAAWElEQVR4AWPo5u4GYhAJgierCPOBFELoeMJxBiAkwAciOEyASEEhTj5MgPtk1UmwaYT5UAooABQCQcJ8sBDEjRCSMB/mKRK0MqA7gDCfpvEyGi+j8TIaLwCoTtCAQiXtYAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAOklEQVQoz2NgQAOWlpZRhMSwqcEvgU2OGFOJtgmfzQQVD5xmvICqAYRTjlhTSXI6UV7AZSL9NBEyBACwbSS1//dRZAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMJDhMYEkBm58sAAABISURBVHhe7dExEQAwFINQrMRD/Gurhix/6LGwc48AmUKBToGQMZSOgcyhY25eblx+0ldfffXVV1999dVXX3311VdfffXVV/8Btlgq5Eo+mtMAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAAXCAMAAAAhvaEKAAAAM1BMVEUAAAAjIyMjIyMAAAAPDw8PDw8kJCQAAAAAAAAkJCQAAAAAAAA7OztAQEBHR0cxMTExMTFSK924AAAAEXRSTlMAFgAGEQAVAgsADwceICQaAKU/Wn8AAAIzSURBVHgBjZXhbuM4DIRJc0LNUkm77/+exaLApreIRdusLjH6/bAAmdSQozCWA10eGC4PdFnJBd7kOQ24rGgrh9Dkgf/aEZKAs22bYxnhEfIAuAwMoRxooIvU1xzLyMeu2hEepHDs2LWXesbT16p6FhAestKZCtx2nCXXS7ntxtI6GY5bPzqt1mFEQkGnkz216OGkjtBeXSjPdnVqkKQcdPhIg82d6Ztn3xPUt4xYXw9VDGk45RUdaNZ3GcOaEU1OCO+PJ3c/jJImn9HfucmgH7+nU+Amhs3sfg35EcBaF8zU5GeY9r4K+YsZIEml06QCXRbopEIAzgE8MNnvV1wuc/sEQoNU2eCXXD6K0r3/uctGuy/4vMtEs79f/5Xd64eo7KiK3z/lCfX6nIcn7iavMCBfjllLuqLJGeGWCcnYOMP8MGuU5/8XIWlTmpp3SdLvg84VqdSwpuaUiYxvxBiC5P13UlVawHkEdSrqXFGX5P3YtYBzVu3ZrW2HH6lLdzxzr6GUh5ABuF12e+l0CLbMXSX9f0GoSaJNJCuldjnlllkRuyEm5+SFlKR2e9JJIxWRh6F9L43lW0UH9v9roF63czIh10YNJznPTszhbR8TN5mxcj3apnW+1ELPdi2b2KsEzr7bA2bSdvY15vnpkmSIZerWlLOaPCi6Xe1bK0wB1JnLZAdFrFcZZpzzcCnK/MThpGVFEfUA4zorwfm7k6/HAvs2FKZPrGv7dKdplstICj2s+wdYtietbSOnTgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAQAAAC00HvSAAAAqUlEQVR4AaXTIa7EMBBEwfrSAAODwAUfGBiY5P7H26XDIqXfAUrpseI520fcAf+itgEqgW4TMugoCKA2J4DanAQ6CgKozYmg44IMuhVk0FaQQceEDLoNyKBtQAZtExKozQkot7Dv37e42rqoaUk6Koe21ngJLYMManN6034xJzz2UnqvvugY+fNvIIOWIoW24aHnG20V/yJtTgAtAyKozQmgpURdLp+nOT9tfAyifaRWFwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAANlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC3dmhyAAAAEnRSTlMYFxkWGhUbExQcHRIeER8PIA73vaSEAAAB3ElEQVQoFQXBh4HkOBAEsHJtSEmz9/kn+wAauv2O+gq9Hz4OB1tEAAnncPWe9g1P4WFs1BRhi8Lv8AqWSddDcecTz3NHryy0oijmf2CtjjwFl9QRJKSu74Fgl/0ExpjYbp+8wCtCjvtzk64+roqUH8oDfAgbYBlboqb+ctNJIx0Cmj8sgRhTBXwEGej2uXxw6Keqy3KVxmwfxgJCV8CHSD46NNbaSscJzVQTsKEqrtlSd0pvn7e7vCAB6LAi5jKv7gkVFjMrP0ZRlg+6VYcvQjeePxcAZ1DU9MEVcCDxhI2akZGawkfIbrwBncABsb1VU7BBvH1eFtL66eEGi60hVM98ODr5OVe3y3A1xqky58uMYEo83EtCKdqAA3sJyAj6x3suNSbpsrDd0ZAlI67GLftT1VL9QDWW1LoJeNr8yAuqVBcAJhH7WincMrw9T2Ecl9Th/ZdOp7NAIo+xPnA9S7N4Ql0wNyiK0mwKy4g5GKeBHPUIBBvbRNWWpHvUuiCaQz2o0RIbbBdPGq1F3sYcpQZZ1tTag9t9CrjZF4yrHga1XZ/Ke/7dVz1unm16WQEIuBKyeU13OR2sJzOIm/h4haPJi1Bx6QN2fauKFcQ3Hb+I5Y96ahWh9YcnnP8BI+wQR1WzuvYAAAAASUVORK5CYII="];
  //Function for innerHTML
  function customInner(oldDiv, html) {
    var newDiv = oldDiv.cloneNode(false);
    newDiv.innerHTML = html;
    oldDiv.parentNode.replaceChild(newDiv, oldDiv);
  }
  //Function for default widgets
  function default_wdg(i) {
    var cached_;
    switch (i) {
      case 0:cached_ = '<div id="search_bar"><img src="'+kiwiIcon+'"/>'+
      '<input class="search_input" placeholder="Search"/><button class="fa fa-search search_button"></button></div>';
          break;
      case 1:
        cached_ = '<div id="quick_links" class="ql_icons">';
        const ar1 = ["chrome://bookmarks", "chrome://extensions", "chrome://downloads", "chrome://history/"];
        const ar2 = ["fas fa-bookmark", "far fa-puzzle-piece", "fas fa-download", "far fa-history"];
        for (var i = 0; i < 4; i++)
          cached_ += '<a href="' + ar1[i] + '" > <i class="' + ar2[i] + '"></i></a>';
        cached_ += "</div>";
        break;
      case 2:
        cached_ = '<div id="bkg-p" class="swiper-pagination"></div><div class="swiper-container s1" id="bkg-c" oncontextmenu="return false" > <div class="swiper-wrapper">';
        for (var i = 1; i < 4; i++)
          cached_ += '<div class="swiper-slide"><div id="bookmarks-grid' + i + '" class="bm-grid"></div></div>';
        cached_ += "</div></div>";
        break;
      case 3: cached_ = '<div id="newsToolbar" ><select id="newsLocal" onchange="select_locale()"><option value="?hl=en-US&gl=US&ceid=US:en">English | United States</option></select><span onclick="toggle_news_view()" class="newsT_icon"><i class="fas fa-stream"></i></span><span onclick="reload_locale()" class="newsT_icon"><i class="far fa-sync-alt newsT_icon"></i></span></div><div id="news-section"><div id="news"></div><div id="newsMore"></div></div>';
        break;
      case 4:
        var ar = ["Bookmarks", "Download", "Closed Tabs", "History"];
        cached_ = '<div class="wdg_tabs"><ul>';
        for (var i = 1; i < 5; i++) {
          cached_ += '<li><input type="radio" id="tab' + i + '" class="rd_tab" name="tabs" checked><label for="tab' + i + '" class="tab_label">' + ar[i - 1] + '</label><div class="tab-content"><h2>' + ar[i - 1] + '</h2><article></article></div></li>';
        }
        cached_ += '</ul></div>';
        break;
    }
    return cached_;
  }
  //Get cached widgets
  var ntp_wdg = localGet("ntp_wdg");
  //Create default widgets and cache them 
  if (ntp_wdg == undefined) {
    console.log("Create default cached widgets ");
    ntp_wdg = [
      {
        name: "Search Bar",
        cached: default_wdg(0)
      },
      {
        name: "Quick Links",
        cached: default_wdg(1)
      },
      {
        name: "Bookmarks Grid",
        cached: default_wdg(2)
      },
      {
        name: "News Section",
        cached: default_wdg(3)
      },
      {
        name: "Tabs Widget",
        cached: default_wdg(4)
      },
    ];
    localStore("ntp_wdg", ntp_wdg);
  }
  //Get cached settings
  var ntp_sett = localGet("ntp_sett");
  //Create default settings and cache them 
  if (ntp_sett == undefined) {
    ntp_sett = [
      { //Widgets
        order: [0, 1, 2, 3, 4],
        status: [0, 0, 1, 1, 0],
        values: ["#00000059", "#00000059", "#00000059", "#00000059", "#00000059"],
        colors:[],
        options:[]
      },
      {//NTP Background
        status:[false,true,true,false,false],
        c22:"radial-gradient(at top left, rgb(0, 60, 125), rgb(0, 255, 241))",
        c23:"url("+patternsURI[0]+"),radial-gradient(at top left, rgb(0, 60, 125), rgb(0, 255, 241))",
        c24:"auto",
        gradientC: "radial-gradient(at top left, rgb(0, 60, 125), rgb(0, 255, 241))",
        solidC:"#c5c5c5",
        patternURL: patternsURI[0],
        wallpaperURL: "",
        wallpaperFILE: ""
      }
    ];
    //Get default property colors
    for(var i=0;i<22;i++){
       ntp_sett[0].colors.push(getComputedStyle(document.documentElement).getPropertyValue("--ntp-c"+i));
    }
    //Get default property options
    for(var i=0;i<12;i++){
      ntp_sett[0].options.push(getComputedStyle(document.documentElement).getPropertyValue("--ntp-o"+i));
    }
    localStore("ntp_sett",ntp_sett);
  }else{
    //Load css property of root
    try {
      for (var i = 0; i < 5; i++) {
        root.style.setProperty("--ntp-wdg"+i, ntp_sett[0].values[i]);
      }
      for (var i = 0; i < 22; i++) {
        root.style.setProperty("--ntp-c"+i, ntp_sett[0].colors[i]);
      }
      for (var i = 0; i < 12; i++) {
        root.style.setProperty("--ntp-o"+i, ntp_sett[0].options[i]);
      }
      root.style.setProperty("--ntp-c22", ntp_sett[1].c22);
      root.style.setProperty("--ntp-c23", ntp_sett[1].c23);
      root.style.setProperty("--ntp-c24", ntp_sett[1].c24);
    } catch (err) {
      addLogS("Error:" + err.name + " ( " + err.message + " )");
    }
  }
  
  function load_widgets(){
    //Load widgets from cache
    try {
      var list=document.getElementById("listWidgetOrder").querySelectorAll("li");
      for (var z = 0; z < 5; z++) {
        var y = ntp_sett[0].order[z];
        var status = ntp_sett[0].status[z];
        var wdgn = document.getElementById("wdg-"+y);
        var c="";
        if(status){
          wdgn.style.display="block";
          c="checked";
          customInner(wdgn, ntp_wdg[z].cached);
        }else{
          wdgn.style.display="none";
        }
        list[y].setAttribute("data-order",z);
        customInner(list[y],'<i class="fal fa-arrows my-handle"></i><label>'+ntp_wdg[z].name+'</label><input '+
        'class="toggle togg_li" type="checkbox" onchange="toggle_widget('+y+')" '+c+'/>')
      }
    } catch (err) {
      addLogS("Error:" + err.name + " ( " + err.message + " )");
    }
  }
  load_widgets();
  function toggle_widget(i){
      var y = ntp_sett[0].order[i];
      var status=(ntp_sett[0].status[i]==1)?0:1;
      ntp_sett[0].status[i]=status;
      if (status){
        document.getElementById("wdg-"+y).style.display="block";
        customInner(document.getElementById("wdg-" + y), ntp_wdg[i].cached);
      }
      else {document.getElementById("wdg-"+y).style.display="none";}
      localStore("ntp_sett",ntp_sett);
  }
  //Bookmark grid configuration
  if (ntp_sett[0].status[2]) {
    var timeoutVariable;
    var currentEditedTile;
    //Function for open and close dialog
    function func_co_dlg(a, i) {
      if (i) {
        document.getElementById('p-tile').src = "#";
        document.getElementById('i-url').value = "";
        document.getElementById("form-id1").reset();
        document.getElementsByTagName('input').className = "form-input";
        document.getElementById('e-icon').innerHTML = '<i class="far fa-sync-alt"></i> &nbsp; Auto &nbsp;';
        document.getElementById('i-url').disabled = true;
        document.getElementById('btn-add').style.display = 'inline';
        document.getElementById('btn-save').style.display = 'none';
        document.getElementById('btn-del').style.display = 'none';
      }
      document.getElementById("floating-btn").classList.remove("open");
      document.getElementById("fb-btn").innerHTML = '<i class="fas fa-caret-up"></i>';
      document.getElementById("dlg_nt").style.display = (a) ? "inline" : "none";
      document.getElementById("dlg_nt").style.opacity = a;
    }
    //Function to remove a tile
    function remove_tile_from_grid(e) {
      console.log("Removing tile : " + e);
      item = e.target;
      item = item.parentNode;
      //Remove item from grid 
      item.parentNode.removeChild(item);
      event.stopPropagation();
    }
    function remove_tile_from_editMode() {
      item = currentEditedTile.parentNode;
      //Remove item from grid 
      item.removeChild(currentEditedTile);
      event.stopPropagation();
      window.setTimeout(function () {
        setup_grid();
      }, 100);
    }
    //Function to create a new tile from dialog box
    function create_new_tile() {
      var ngrid = ((document.querySelector('.swiper-slide-active .bm-grid')).id)[14];
      var keyS = "storedItems" + (ngrid);
      var url = document.getElementById('t-url').value;
      var i_url = document.getElementById('p-tile').src;
      var rootDomain = get_root_domain(url);
      //If user left the title empty pick the rootDomain as title of tile
      var title = document.getElementById('t-lab').value;
      if (title == "") title = rootDomain;
      if (typeof localGet(keyS) == "undefined" || localGet(keyS) == "") localStore(keyS, []);
      var sItems = localGet(keyS);
      var newTile = {
        url: url,
        title: title,
        imgSrc: i_url,
        ngrid: ngrid
      }
      sItems.push(newTile); //Add new tile to list 
      localStore(keyS, sItems); //Save the new list of tiles
      add_tile_to_grid(newTile); //Create new tile and add to grid
      window.setTimeout(function () {save_grid_snapshot();}, 200);
      localStorage.useCustomTiles = "true";
      func_co_dlg(0, 1);
    }
    //Set p-tile image from t-url
    function setPT_fromTurl(tID) {
      if (document.getElementById('i-url').disabled) {
        window.clearTimeout(timeoutVariable);
        timeoutVariable = setTimeout(function () {
          var iUrl = "https://logos.kiwibrowser.com/" + get_root_domain(tID.value);
          document.getElementById('p-tile').src = iUrl;
          document.getElementById('i-url').value = iUrl;
        }, 1000);
      }
    }
    //Set p-tile image from i-url
    function setPT_fromIurl(tID) {
      window.clearTimeout(timeoutVariable);
      timeoutVariable = setTimeout(function () {document.getElementById('p-tile').src = tID.value;}, 1000);
    }
    //Switch between auto/custom mode of icon
    function switch_auto_custom(eID) {
      var idIURL = document.getElementById('i-url');
      if (idIURL.disabled) {
        eID.innerHTML = '<i class="far fa-edit"></i>&nbsp; Custom &nbsp;';
        idIURL.value = "";
        idIURL.disabled = false;
        idIURL.select();
        idIURL.focus();
      } else {
        eID.innerHTML = '<i class="far fa-sync-alt"></i>&nbsp; Auto &nbsp;';
        var bID = document.getElementById('t-url');
        var iUrl = "https://logos.kiwibrowser.com/" + get_root_domain(bID.value);
        window.clearTimeout(timeoutVariable);
        timeoutVariable = setTimeout(function () {
          document.getElementById('p-tile').src = iUrl;
        }, 1000);
        idIURL.value = iUrl;
        idIURL.disabled = true;
        (bID).classList.remove('filled');
      }
    }
    //Function to get rootDomain
    function get_root_domain(url) {
      return url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
    }
    //Function to apply change to edited tile and save
    function save_edited_tile() {
      var nGrid = (parseInt(currentSwiperSlide) + 1);
      var keyS = "storedItems" + nGrid;
      var items = localGet(keyS);
      var item = currentEditedTile;
      var bkmg = document.getElementById("bookmarks-grid" + nGrid);
      var index = items.offset;
      //Find index of edited tile
      for (i = 0, len = bkmg.children.length; i < len; i++) {
        if (bkmg.children[i] == item) index = i;
      }
      items[index] = {
        url: document.getElementById('t-url').value,
        title: document.getElementById('t-lab').value,
        imgSrc: document.getElementById('p-tile').src,
        ngrid: nGrid
      }
      //Apply changes to the tile on grid
      item.querySelector('#tile_target').href = items[index].url;
      item.children[2].children[1].innerHTML = items[index].title;
      item.children[2].children[0].src = items[index].imgSrc;
      //Save changes on local storage
      localStore(keyS, items);
      save_grid_snapshot();
      document.getElementById('btn-add').style.display = 'inline';
      document.getElementById('btn-save').style.display = 'none';
      document.getElementById('btn-del').style.display = 'none';
      func_co_dlg(0, 1);
    }
    //Function to get fallback icon on preview tile src error
    function get_fallback_icon() {
      var url = document.getElementById('i-url').value;
      if (url[30])
        document.getElementById('p-tile').src = document.getElementById('i-url').value + "?fallback=1";
    }
    //Function that return jdenticon if img src of tile is invalid
    function invalidate_image(item) {
      var parser = document.createElement('a');
      parser.href = item.title;
      var rootDomain = psl.get(parser.hostname);
      //console.log("Invalidating rootDomain: " + rootDomain);
      item.src = "data:image/svg+xml;base64," + btoa(jdenticon.toSvg(parser.hostname, 64));
      localStorage.setItem('icon-' + rootDomain, item.src);
    }
    //Function to edit a tile from grid
    function edit_tile_from_grid(e) {
      console.log("Editing tile : " + e);
      item = e.target;
      item = item.parentNode;
      currentEditedTile = item;
      var url = item.querySelector('#tile_target').href;
      var title = item.textContent;
      var img = item.querySelector('#tile_target > img').src;
      //Set dialog with current item to edit
      document.getElementById('e-icon').innerHTML = '<i class="far fa-edit"></i> Custom';
      document.getElementById('i-url').disabled = false;
      document.getElementById('btn-add').style.display = 'none';
      document.getElementById('btn-save').style.display = 'inline';
      document.getElementById('btn-del').style.display = 'inline';
      document.getElementById('p-tile').src = img;
      document.getElementById('i-url').value = img;
      document.getElementById('t-url').value = url;
      document.getElementById('t-lab').value = title;
      func_co_dlg(1, 0);
    }
    //Function to add a tile into the grid 
    function add_tile_to_grid(item) {
      //Retrieve some user settings 
      var targetBlank = ntp_sett[0].options[4];
      //Get rootDomain from url
      var rootDomain = get_root_domain(item.url);
      if (typeof item.title === "undefined" || item.title === "") item.title = rootDomain;
      var innerDiv = document.createElement('div');
      innerDiv.className = 'grid-item';
      if (typeof item.imgSrc === "undefined")
        item.imgSrc = 'https://logos.kiwibrowser.com/' + rootDomain;

      //Create the tile
      innerDiv.innerHTML = '<img id="closeImg" src="' + closeImg + '" class="close_img toggleEditMode editMode" />' +
        '<img id="editImg" src="' + editImg + '" class="edit_img toggleEditMode editMode"  style="bottom: 0px;" />' +
        '<a id="tile_target" class="tile_target" name="' + item.title + '" href="' + item.url + '" ' + targetBlank + '>' +
        '<img border="0" class="grid-image"  title="' + item.title + '" src="' + item.imgSrc +
        '" onError="invalidate_image(this)" /><span id="title_span" style="line-height: 15px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">' +
        item.title + '</span></a>';
      var nGrid = item.ngrid;
      document.getElementById('bookmarks-grid' + nGrid).appendChild(innerDiv);
      console.log(" Function add_tile_to_grid -> grid :" + item.ngrid + " | url : " + item.url + "   |  title : " + item.title + " | img : " + item.imgSrc);
    }
    //Function to add a tile into the storage from grid
    function add_tile_to_storage(el) {
      var nGrid = ((el.parentNode).id)[14];
      var keyS = "storedItems" + nGrid;
      var items = localGet(keyS);
      var itm = {
        url: el.querySelector('#tile_target').href,
        title: el.textContent,
        imgSrc: el.querySelector('#tile_target > img').src,
        ngrid: nGrid
      }
      items.push(itm);
      localStore(keyS, items);
      console.log(" add_tile_to_storage : offset " + items.length + " grid n°: " + nGrid + "the URL: " + itm.url +
        " title: " + itm.title + " imgSRc: " + itm.img);
    }
    //Function to cache the grid 
    function save_grid_snapshot() {
      if ((typeof localStorage.cachedGridUpdate == "undefined") || ((Date.now() / 1000) - localStorage.cachedGridUpdate) >= 0.1) {
        var y = ntp_sett[0].order[2];
        ntp_wdg[2].cached = document.getElementById('wdg-' + y).innerHTML;
        localStorage.cachedGridUpdate = (Date.now() / 1000);
        console.log("Saving grid snapshot on update : " + localStorage.cachedGridUpdate);
      }
      localStore("ntp_wdg", ntp_wdg);
    }

    var closeImg ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAACNvAAAjbwE1/Af7AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAANVQTFRF////11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK2F9P2WBR2WJT2mVW33pt5ZSJ5peN6J+V6KGY/PHv/PHw/PPy/PTz/fb1////fP+U/wAAADd0Uk5TAAEDBAYLDA4VHB4fNDg8PUJDR0pbc3yCg4SGiImVlqWnq661uLq/wsPFy9DT2d7m6+zt8/n6/uYUS2MAAANwSURBVHjazVvnWiJBEBwjBjwRCSfgkWHJectAUnTf/5FuDeehIhN3euv3fFu1aaa7upsxFUSiiXS+7LS6/fG432055Xw6EY0wKziI52o9bESvlosfBEq+H7tqTLAVk8bv2H5A9GfXQwhheH1mnv001YEEOqlTo/TRkgtJuKWoMfrzCpRQOTdCf1GHMuoX2vTHRWiheKxFv5ccQROj5J46/682DKD9S5F+N+PCCNzMrtLbd2AMjsKXcDmAQQwuJel3si6Mws3uSJ06BRhHQeKMOqwiAFQPRfmPmggEzSMx/pMOAkLnROj+A+P3FQg8g8MmAkST+x3sVxEoqpx/YaeAgFHYvh9kETiyW/dfN3gB7pZd+XgACxj8eDLtOrAC56fTOQNLyPwQ/7i2BLgbY6S9NqyhvSlOTMIikhv+gJFNAaPvf0IRVlH8lv/AMr7mTHXbAupf8k9Yx+fMtWJfQOVT/g8CrPsHJe7q28XsRvzad8v5PXdRac1/4W7C9yvPe5iK8k8fPW91y92Q/7s4Ke4l556PJ0EF06eX1QvuutSHAH4cvPTEFbzxezN+jPzhvwm81EdhBe/8DwKfzD8371r8tvgKhBf6+PMeiQ9hToEMP4ZvMXpM5tPiXFqKH4i9CriCMQWS/Lh6FdCAKQWy/Gi8+u8TGFIgzY/Ji7sfl9i+t1LI8wNxX0AOZhSo8CPnC6jBiAIlftR8AT2YUKDGjx5jEdljfCOVIj8QUYhFNpAp8/tRSQL6CtT5kWBpaCvQ4Eea5aGrQIcfeVaGpgItfpSZoinxQavHD4e1oKXg+VmLHy3WhZ4CPX50WR/6CtT50Wdj9dRm+vb4vWd1fozpBZC/AvKPkPw3JN+IyLdi8sOI/DgmD0jIQzLyoJQ8LKdPTMhTM/LklDw9Jzco6C0acpOK3KYjNypFrNqbB1mr9vGOv/RM3KyeyZvVS+7CjoRdv5C36+fcdSmJgsXtyn+o4gUL/4WtuCWTtYKFQMnmfr68E97gcDNbcAsm6yUb+qIVedmOvnBJXrqlL16Tl+/pGxjIWzjom1jI23joG5noW7nIm9no2/noGxrpWzrJm1rp23rpG5vpW7vpm9vp2/vpBxzoRzzoh1xCMOZDP+hEP+oVgmE3+nG/EAw8hmDkMwRDryEY+w3B4HMYRr9DMPwexPj/X+Yt8H/u7e31AAAAAElFTkSuQmCC';
    var editImg ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEAElEQVRYR7WXf0zUdRjHX89x8tumhYiKig4yhxEH+kfN5ubMFbmmm2TLjVbKEBr9MBbmamP90GisEicH5WzV/AO3cnPYmrUlaTZH/AhchpBKYRMitZKAOO5p3zuPuzju7ht33Pbd7vv5PM/7/f48n+/n+TyPYPZXlxuP0/kQyKNABkoSaDKIExhAGADtRPiEmOsNPHl52Ay0hDSqts1hBntQ2YoQF9LeMFCGED3MKLt5pvW3YD6BBVRgZW5OOaovIZJginiikeogInvpa6mkAsdkGJMLqLl7NlgbELlvSsT+Qs6AYwMlHdcnTvkLqM3OQOUESFpEyMdB9DKi69nR1uWL+18BdblJOJ1tIAsiS34LTbWHKMtKipoHPPheAW+nxhGXfBrImRZyL2gLQ/2r2dk7ZAx5BdizK8Hy4jST34J3vkVxW7lXgP2eBRDVDcSGK2DL4nVXf7hxKaHjj59mBsEaxurIoLC91x0Bu+19kO3hkj971xZeXvEUQ45hnvj2Vb7qaw4CqQcpbi0UjmRGMxBzw3SSCQJZtnwr5ZkFLguH00Hh2T00XPlmcg8jWSWNzBJqs/NQy/FwVv/0nZvp/LOHL682YfyvyCp0wVX/WM9r5w4FhlbNE+y2WpCiqQrwhP0f5yiPn36Fxv5Wtqc/wvLbllDWsg8NCqx1Qo3tJCJrpiLAQ+7xHR4bYVNjOd9dO28OTrXRiMAFkAxzHl6rieSemQ8vHqespdocnOoFwZ4zCMSb83BbFaVv4vXsHX4uR385SdHZvSHC7uOmOmhswV+IJJoVEDFyg1D1piGgC5F0MwICkdf3fEFpU5X5lXvIVLuNLfgauD+UgMcWP8D+VWV+ZlMmdyOdMn0MU+OTObamioUJc8dFfHzpM15oDnXUgixNeS9kIipdls+82CR2f29nXtwdLhFpifMxyHc27wsVuODz4nzYnYp/jzEqFb+TMNMaz8WNR10gntXOiZ1NwZI8qs4fDo98PBUbMDW2g4hsm4i4NmUl9avfGB8Oc78nwOshilu3uW/DAysWYpnRDRLta+V7uRjj//ucB47RKFbHUu917IpCzjsIz/n6bF60lnUpqzjV3+bK8b1/94cX9vHjx7uUtDxvvHoroo+yErhpPYOQFRmWgCgdJDjupaDdyMA+AlxbkZmCJboJJHV6ROgVrKO5FJ7r8+D7l+U1WcsQ6wlgUYRF/Iw61lPS3umLO3ljYpTnY/o5Qm5ERCjNRMmDvuV44Ah4Zj5Ii2X4dqNy3RVGsWo0qG8Se60yULMaujndb5tPlFSC5iMSYyoiqiMIR3Cwi9LWX4P5hBbg8T6QmYglegNKPrAUMdpzklHU3Zq7ni6ET4kfO+b5ykMJ/heL12GStB7T3QAAAABJRU5ErkJggg==';
    var grids = [,,];

    //Function to create the most visited tiles 
    function fetch_tiles_from_most_visited() {
      if (typeof localStorage.useCustomTiles == "undefined" || localStorage.useCustomTiles == "false") {
        console.log(" fetch_tiles_from_most_visited...");
        if (typeof window.chrome.embeddedSearch != "undefined" && chrome.embeddedSearch.newTabPage.mostVisitedAvailable) {
          var pages = chrome.embeddedSearch.newTabPage.mostVisited;
          for (var ind = 1; ind < 4; ind++) {
            var sItems = [, , , ];
            for (var i = 0; i < Math.min(4, pages.length); ++i) {
              sItems[i] = {
                url: chrome.embeddedSearch.newTabPage.getMostVisitedItemData(pages[i].rid).url,
                ngrid: ind
              }
              add_tile_to_grid(sItems[i]);
            }
            localStore("storedItems" + ind, sItems);
          }
          console.log(" Loaded 12 tiles from most visited");
        }
        localStore("useCustomTiles", 1);
      }
      save_grid_snapshot();
    }
    //Function to exit from editemode
    function process_body_click(e) {
      if (!grids[0].option("disabled") || !grids[1].option("disabled") || !grids[2].option("disabled")) {
        toggle_edit_mode();
        e.preventDefault();
      }
    }
    //Function to toggle edit mode of tiles
    function toggle_edit_mode() {
      var n = ((document.querySelector('.swiper-slide-active .bm-grid')).id)[14];
      var state = grids[n - 1].option("disabled");
      console.log("Toggle_edit_mode _ state:" + state);
      bk_swiper.allowTouchMove = (state) ? false : true;
      grids[n - 1].option("disabled", !state);
      var el = document.querySelector('.swiper-slide-active .bm-grid');
      Array.prototype.forEach.call(el.getElementsByClassName("grid-item"), function (el) {
        el.style.WebkitAnimation = (!state) ? 'none' : 'shadow-inset-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
      });
      Array.prototype.forEach.call(el.getElementsByClassName('editMode'), function (el) {
        if (!state) el.classList.add('toggleEditMode');
        else el.classList.remove('toggleEditMode');
      });
      if (!state) {
        localStore("storedItems" + (n), []);
        Array.prototype.forEach.call(el.getElementsByClassName("grid-item"), function (el) {
          add_tile_to_storage(el);
        });
        save_grid_snapshot();
      }
    }
     //Function to add listener on grid-items
     function add_ev_listener(){
        var closeImg = document.getElementsByClassName("close_img");
        Array.prototype.forEach.call(closeImg, function (el) {
          el.addEventListener("click", remove_tile_from_grid);
        });
        var editImg = document.getElementsByClassName("edit_img");
        Array.prototype.forEach.call(editImg, function (el) {
          el.addEventListener("click", edit_tile_from_grid);
        });
         //Add context listener on tiles used to enable edit_mode
        window.setTimeout(function () {
          Array.from(document.getElementsByClassName("grid-item")).forEach(element => {
            element.oncontextmenu = function () {
              toggle_edit_mode();
            };
          });
        }, 300);
    }
    //Function to create grid
    function setup_grid() {
      console.log("setup_grid_ ");
      if (localGet("storedItems1") == undefined || localGet("storedItems2") == undefined || localGet("storedItems2") == undefined) {
        fetch_tiles_from_most_visited()
      } else if (localGet("getStoredItemsOnUpdate") == undefined) {
        console.log("First time,after update get user tiles");
        for (var i = 1; i < 4; i++) {
          var items = localGet("storedItems" + i);
          if (items) {
            customInner(document.getElementById("bookmarks-grid" + i), "");
            items.forEach(el => {
              add_tile_to_grid(el);
            });
          }
        }
        localStore("getStoredItemsOnUpdate", 1);
      }
      //Create grids with draggable items 
      var bookmarksGrids = [document.getElementById("bookmarks-grid1"), document.getElementById("bookmarks-grid2"), document.getElementById("bookmarks-grid3")];
      for (var i = 0; i < 3; i++) {
        grids[i] = new Sortable(bookmarksGrids[i], {
          animation: 150,
          ghostClass: 'hidden',
          disabled: 1,
          direction:"horizontal",
          draggable: ".grid-item",
        });
        add_ev_listener();
      }
      window.setTimeout(function () {
        save_grid_snapshot();
      }, 900);
    }
    //Call setup_grid
    try {
      window.setTimeout(function () {
        setup_grid();
      }, 2);
    } catch (err) {
      console.log("Delayed init failed, retrying later");
      window.setTimeout(function () {
        setup_grid();
      }, 100);
    }
    //Check active slide on this session
    var currentSwiperSlide = sessionStorage.getItem("currentSwiperSlide");
    if (currentSwiperSlide == undefined) {currentSwiperSlide = 0;} //Set default slide
    //Create swiper for grids
    var bk_swiper = new Swiper(' .s1', {
      speed: parseInt(ntp_sett[0].options[2]), //speed:  Fast|150 , Normal|450 , Slow|850 
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      effect: ntp_sett[0].options[1], // effect : "slide", "fade"
      fadeEffect: {
        crossFade: true
      }, //Better fade effect
      initialSlide: currentSwiperSlide,
    });
    //Set activeIndex on slide change
    bk_swiper.on('slideChange', function () {sessionStorage.currentSwiperSlide = bk_swiper.activeIndex;});
    //Make sure there is no edit_mode status 
    Array.prototype.forEach.call(document.getElementsByClassName("grid-item"), function (el) {el.style.WebkitAnimation = 'none';});
    Array.prototype.forEach.call(document.getElementsByClassName('closeImg'), function (el) {el.classList.add('toggleEditMode');});
    //Add body click used to disable edit_mode
    document.body.addEventListener("click", process_body_click);
    add_ev_listener();
  }
  // End of Bookmarks grid section
  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  //Check News Section widget status
  if (ntp_sett[0].status[3]) {
    //Function that reset readed news
    function resetNH_items() {
      localStorage.removeItem("itemsNewsH");
      reload_locale();
    }
    //Function that add delete item news on swipe
    function addSwipeToDelete() {
      var xDown = xDiff = null;
      var tasks = document.getElementsByClassName("newsItem");
      function is_touch_device() {
        try {document.createEvent("TouchEvent");return true;} catch (e) {return false;}
      }
      for (var i = 0; i < tasks.length; i++) {
        if (is_touch_device()) {
          tasks[i].addEventListener('touchstart', handleTouchStart, false);
          tasks[i].addEventListener('touchmove', handleTouchMove, false);
          tasks[i].addEventListener('touchend', handleTouchEnd, false);
        }
        //code for desktop item move
      }
      function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
      }
      function handleTouchMove(evt) {
        var el = (evt.target.closest("div.newsItem"));
        el.style.transition = "margin 0ms";
        if (!xDown) return;
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        xDiff = xDown - xUp;
        if (xDiff < 20 && xDiff > -20) return;
        if (xDiff < -20) el.style.marginLeft = ((Math.abs(xDiff))) + 'px';
        else el.style.marginLeft = "-" + (xDiff) + 'px';
        if (xDiff < 130 && xDiff > -130) {
          var op = ((Math.abs(xDiff)) / 130);
          el.style.opacity = "1" - op;
        }
      }
      function handleTouchEnd(evt) {
        var el = (evt.target.closest("div.newsItem"));
        if (xDiff > 130 || xDiff < -130) {
          el.style.display = "none";
          var itemsArray;
          if (localStorage.getItem('itemsNewsH')) itemsArray = JSON.parse(localStorage.getItem('itemsNewsH'));
          else itemsArray = [];
          itemsArray.push(el.id);
          localStorage.setItem('itemsNewsH', JSON.stringify(itemsArray));
          console.log("News with id : " + el.id + " added to hide list");
        } else {
          el.style.transition = "margin 600ms";
          el.style.opacity = "1";
          el.style.marginLeft = '4px';
        }
        xDiff = xDown = null;
      }
    }
    //Function to toggle news view mode ( compact / standard )
    function toggle_news_view(){
      var x=document.getElementsByClassName("newsT_icon");
      if(ntp_sett[0].options[7] =="150px"){
        ntp_sett[0].options[7]="auto";
        root.style.setProperty("--ntp-o7", "auto");
        x[0].innerHTML='<i class="fas fa-rectangle-wide"></i>';
      } else{
        ntp_sett[0].options[7]="150px";
        root.style.setProperty("--ntp-o7", "150px");
        x[0].innerHTML='<i class="fas fa-stream"></i>';
        
      }
      localStore("ntp_sett",ntp_sett);
    }
    //Function to reload news
    function reload_locale(){
      console.log("reload locale");
      localStorage.removeItem('cachedNewsUpdate');
      localStorage.removeItem('cachedGNews');
      loadGNews();
      window.setTimeout(function () {addSwipeToDelete();},1000);
      window.setTimeout(function () {addSwipeToDelete();},2000);
    }
    //Function to reload news with new locale selected
    function select_locale() {
      localStorage.newsLocale = document.getElementById('newsLocal').value;
      localStorage.removeItem('cachedNewsUpdate');
      localStorage.removeItem('cachedGNews');
      loadGNews();
      window.setTimeout(function () {addSwipeToDelete();},1000);
      window.setTimeout(function () {addSwipeToDelete();},2000);
    }
    //Function to convert locale into readable text
    function locale_to_readabletext(string) {
      string = string.replace('%3A', ':');
      for (var locale in locales) {
        if (locales[locale].replace('%3A', ':') == string)
          return locale;
      }
      return null;
    }
    var must_clear_news = false;
    //Function for loading news animation
    function render_news_loading() {
      must_clear_news = true;
      document.getElementById('news').innerHTML =
        '<div style="clear:both;text-align:center;width: 100%"><br />&nbsp;<br /><div class="lds-dual-ring"></div></div>';
    }
    //Function to create an id for news 
    function c_itemnews_ID(title, news_time) {
      var result = title.toUpperCase().replace(/\b(\S{1,2})\S*/g, '$1').replace(/ /g, '');
      var tResult = result.substring(0, 8);
      return tResult + "_" + news_time;
    }
    //Function to add a news item 
    function add_gnews(is_primary, title, news_time, source, source_logo, link, image) {
      var itemID = c_itemnews_ID(title, news_time);
      //If the news has been read , don't add it
      if (localStorage.itemsNewsH && (localStorage.itemsNewsH).indexOf(itemID) > -1)return;
      var innerDiv = document.createElement('div');
      var creationTime = new Date(news_time * 1000);
      var timeagoInstance = timeago();
      innerDiv.className = 'newsItem';
      innerDiv.id = itemID;
      innerDiv.innerHTML = '<img src="' + image + '" class="newsImage" />' +
        '<div class="newsContent">' +
        '<span class="newsAttribution"><img src="' + source_logo + '/>&nbsp;&nbsp;&nbsp;<a href="' + link + '">' + source +
        '</a></span>' +
        '<div class="newsTitle"><a href="' + link + '">' +
        title + '</a></div>' +
        '<span class="newsTime">' +
        timeagoInstance.format(creationTime) + '</span></a></div>';
      document.getElementById('news').appendChild(innerDiv);
    }
    var has_valid_entries = false;
    var last_offset_rendered = 0;
    //Function to render news ( get news from gnews )
    function render_gnews(answer, start_offset, n) {
      last_offset_rendered = start_offset + n;
      if (must_clear_news) {
        must_clear_news = false;
        document.getElementById('news').innerHTML = '';
      }
      var el = document.createElement('div');
      el.style.display = 'none';
      el.baseURI = newsServer;
      el.innerHTML = answer.replace(new RegExp('<img', 'gi'), '<source');
      var articles = el.getElementsByTagName('article');
      for (var i = start_offset; i < articles.length && i < (n + start_offset); i++) {
        var article = articles[i];
        var children = article.childNodes;
        var title = null;
        var link = null;
        var image = null;
        var source = null;
        var source_logo = null;
        var is_primary = false;
        var news_time = null;
        for (var j = 0; j < children.length; j++) {
          var child = children[j];
          if (child.tagName == 'A') {
            link = child.href;
          } else if (child.tagName == 'FIGURE') {
            if (child.childNodes.length >= 2 && child.childNodes[0].tagName == 'SOURCE') {
              image = child.childNodes[0].src;
              is_primary = true;
            } else if (child.childNodes.length >= 2 && child.childNodes[1].tagName == 'SOURCE') // video to play
            {
              image = child.childNodes[1].src;
              is_primary = true;
            } else if (child.childNodes.length == 1 && child.childNodes[0].tagName == 'SOURCE') {
              image = child.childNodes[0].src;
            }
          } else if (child.tagName == 'H4') {
            title = child.childNodes[0].innerText;
          } else if (child.tagName == 'DIV') {
            if (child.childNodes.length >= 2 && child.childNodes[0].tagName == 'DIV' && child.childNodes[1].tagName ==
              'MENU') {
              if (child.childNodes[0].childNodes[0].tagName == 'TIME')
                news_time = child.childNodes[0].childNodes[0].dateTime;
              else if (child.childNodes[0].childNodes[1].tagName == 'TIME')
                news_time = child.childNodes[0].childNodes[1].dateTime;
            } else if (child.childNodes.length >= 2 && child.childNodes[0].tagName == 'DIV') {
              var subNode = child.childNodes[1];
              if (subNode.childNodes[0].tagName == 'DIV' && subNode.childNodes[1].tagName == 'MENU') {
                if (subNode.childNodes[0].tagName == 'DIV' && subNode.childNodes[1].tagName == 'MENU') {
                  if (subNode.childNodes[0].childNodes[0].tagName == 'TIME')
                    news_time = subNode.childNodes[0].childNodes[0].dateTime;
                  else if (subNode.childNodes[0].childNodes[1].tagName == 'TIME')
                    news_time = subNode.childNodes[0].childNodes[1].dateTime;
                }
              }
              var subNode = child.childNodes[0].childNodes[0];
              if (subNode.childNodes.length == 3 && subNode.childNodes[0].tagName == 'DIV') {
                source = subNode.childNodes[0].innerText;
                var sourceNode = subNode.childNodes[0].childNodes[0];
                if ((sourceNode.tagName == 'A' || sourceNode.tagName == 'SPAN') && sourceNode.childNodes[0].tagName ==
                  'SOURCE')
                  source_logo = sourceNode.childNodes[0].src;
              }
              if (subNode.childNodes.length == 3 && subNode.childNodes[1].tagName == 'H4')
                title = subNode.childNodes[1].innerText;
            } else if (child.childNodes.length >= 2 && child.childNodes[0].tagName == 'FIGURE') {
              if (child.childNodes[0].childNodes[0].tagName == 'SOURCE')
                image = child.childNodes[0].childNodes[0].src;
              else if (child.childNodes[0].childNodes[1].tagName == 'SOURCE') // video to play
                image = child.childNodes[0].childNodes[1].src;
              var divSubNode = child.childNodes[1];
              if (divSubNode.childNodes.length == 3 && divSubNode.childNodes[0].tagName == 'DIV') {
                source = divSubNode.childNodes[0].innerText;
                var sourceNode = divSubNode.childNodes[0].childNodes[0];
                if ((sourceNode.tagName == 'A' || sourceNode.tagName == 'SPAN') && sourceNode.childNodes[0].tagName ==
                  'SOURCE')
                  source_logo = sourceNode.childNodes[0].src;
              }
              if (divSubNode.childNodes.length == 3 && divSubNode.childNodes[1].tagName == 'H4')
                title = divSubNode.childNodes[1].innerText;
            } else if (child.childNodes.length >= 2 && child.childNodes[0].tagName == 'SOURCE') {
              if (child.childNodes[0].tagName == 'SOURCE' && child.childNodes[1].tagName == 'A') {
                source_logo = child.childNodes[0].src;
                if (child.childNodes[1].innerText)
                  source = child.childNodes[1].innerText;
              }
            } else if (child.childNodes.length == 1 && child.childNodes[0].tagName == 'A') {
              subNode = child.childNodes[0];
              source = subNode.innerText;
              var sourceNode = subNode.childNodes[0];
              if (sourceNode.tagName == 'SOURCE')
                source_logo = sourceNode.src;
            } else if (child.childNodes.length >= 2 && child.childNodes[0].tagName == 'A') {
              source = child.childNodes[1].innerText;
              var sourceNode = child.childNodes[0].childNodes[0];
              if (sourceNode.tagName == 'SOURCE')
                source_logo = sourceNode.src;
            } else if (child.childNodes.length >= 2 && child.childNodes[0].tagName == 'SPAN') {
              source = child.childNodes[1].innerText;
              var sourceNode = child.childNodes[0].childNodes[0];
              if (sourceNode.tagName == 'SOURCE')
                source_logo = sourceNode.src;
            } else if (child.childNodes.length >= 2 && child.childNodes[0].tagName == 'SOURCE') {
              if (child.childNodes[1].innerText)
                source = child.childNodes[1].innerText;
            }
          }
        }
        if (news_time && parseInt(news_time.substr(news_time.lastIndexOf(":") + 2)) > 1518000000)
          news_time = parseInt(news_time.substr(news_time.lastIndexOf(":") + 2));
        else
          news_time = parseInt(Date.parse(news_time) / 1000);
        if (link)
          link = link.replace('https://d3ward.github.io/ntp/', 'https://news.google.com/');
        if (link && image && title) {
          has_valid_entries = true;
          //console.log('Title: ' + title);
          add_gnews(is_primary, title, news_time, source, source_logo, link, image);
        }
        if (articles.length > (i + 1) && i <= 29) {
          document.getElementById('newsMore').innerHTML =
            '<div style="width: calc(100vw - 56px);color: var(--ntp-c14);background-color: var(--ntp-c16);box-shadow: 0 1px 4px var(--ntp-o3);font-size: 24px;border-radius: 5px;margin: auto;text-align: center;"><i class="fas fa-ellipsis-h"></i></div><br />&nbsp;<br />';
        } else {
          document.getElementById('newsMore').innerHTML = '';
        }
      }
      localStorage.cachedGNews = answer;
    }
    console.log('News locale is ' + localStorage.newsLocale);
    //Function to load news 
    function loadGNews(){
      if (typeof localStorage.cachedGNews != "undefined" ) {
      console.log('Rendering GNews from cache');
      render_gnews(localStorage.cachedGNews, 0, 10);
      if (typeof localStorage.lastOffsetRendered != "undefined") {
        for (var i = 10; i <= localStorage.lastOffsetRendered; i += 10)
          render_gnews(localStorage.cachedGNews, i, 10);
      }
      }
      if ((typeof localStorage.cachedNewsUpdate == "undefined") 
              || ((Date.now() / 1000) - localStorage.cachedNewsUpdate) > 3600 
              || (typeof localStorage.needFetch == "undefined")) {
        if (typeof localStorage.hideNews == "undefined") {
          localStorage.needFetch = false;
          console.log("Fetching fresh news");
          has_valid_entries = false;
          try {
            document.getElementById('newsMore').innerHTML = '';
            last_offset_rendered = 0;
            localStorage.lastOffsetRendered = 0;
            render_news_loading();
            fetch(newsServer + 'foryou' + localStorage.newsLocale, {
                method: 'GET',
                credentials: 'include'
              })
              .then(function (response) {
                if (response.url.includes("&ceid=")) {
                  localStorage.newsLocale = response.url.substr(response.url.lastIndexOf('?'));
                }
                return response.text();
              }).then(function (answer) {
                if (answer != localStorage.cachedGNews) {
                  render_gnews(answer, 0, 10);
                }
                localStorage.cachedNewsUpdate = (Date.now() / 1000);
              });
          } catch (err) {
            console.log('Fetch news failed for: ' + err.message);
          }
          try {
            if (!has_valid_entries) {
              last_offset_rendered = 0;
              localStorage.lastOffsetRendered = 0;
              render_news_loading();
              fetch(newsServer + localStorage.newsLocale, {
                  method: 'GET',
                  mode: 'cors'
                })
                .then(function (response) {
                  console.log('News Response:');
                  console.log(response);
                  if (response.url.includes("&ceid=")) {
                    localStorage.newsLocale = response.url.substr(response.url.lastIndexOf('?'));
                  }
                  return response.text();
                })
                .then(function (answer) {
                  console.log('Has valid entries: ' + has_valid_entries);
                  if (answer != localStorage.cachedGNews && !has_valid_entries) {
                    render_gnews(answer, 0, 10);
                  }
                  localStorage.cachedNewsUpdate = (Date.now() / 1000);
                });
            }
          } catch (err) {
            console.log('Fetch generic news failed for: ' + err.message);
          }
        }
      }
    }
    //Function to add more news
    function load_more_news() {
      localStorage.lastOffsetRendered = last_offset_rendered;
      render_gnews(localStorage.cachedGNews, last_offset_rendered, 10);
      window.setTimeout(function () {addSwipeToDelete();},300);
    }
    preconnectTo(newsServer);
    document.getElementById('newsMore').addEventListener('click', load_more_news);
    var x=document.getElementsByClassName("newsT_icon");
    if(ntp_sett[0].options[7] =="auto") x[0].innerHTML='<i class="fas fa-rectangle-wide"></i>';
    else x[0].innerHTML='<i class="fas fa-stream"></i>';
    //Variable of locales
    var locales = {
      'English | Australia':'?hl=en-AU&gl=AU&ceid=AU:en',
      'English | Botswana':'?hl=en-BW&gl=BW&ceid=BW:en',
      'English | Canada':'?hl=en-CA&gl=CA&ceid=CA:en',
      'English | Ethiopia':'?hl=en-ET&gl=ET&ceid=ET:en',
      'English | Ghana':'?hl=en-GH&gl=GH&ceid=GH:en',
      'English | India':'?hl=en-IN&gl=IN&ceid=IN:en',
      'English | Indonesia':'?hl=en-ID&gl=ID&ceid=ID:en',
      'English | Ireland':'?hl=en-IE&gl=IE&ceid=IE:en',
      'English | Israel':'?hl=en-IL&gl=IL&ceid=IL:en',
      'English | Kenya':'?hl=en-KE&gl=KE&ceid=KE:en',
      'English | Latvia':'?hl=en-LV&gl=LV&ceid=LV:en',
      'English | Malaysia':'?hl=en-MY&gl=MY&ceid=MY:en',
      'English | Namibia':'?hl=en-NA&gl=NA&ceid=NA:en',
      'English | New Zealand':'?hl=en-NZ&gl=NZ&ceid=NZ:en',
      'English | Nigeria':'?hl=en-NG&gl=NG&ceid=NG:en',
      'English | Pakistan':'?hl=en-PK&gl=PK&ceid=PK:en',
      'English | Philippines':'?hl=en-PH&gl=PH&ceid=PH:en',
      'English | Singapore':'?hl=en-SG&gl=SG&ceid=SG:en',
      'English | South Africa':'?hl=en-ZA&gl=ZA&ceid=ZA:en',
      'English | Tanzania':'?hl=en-TZ&gl=TZ&ceid=TZ:en',
      'English | Uganda':'?hl=en-UG&gl=UG&ceid=UG:en',
      'English | United Kingdom':'?hl=en-GB&gl=GB&ceid=GB:en',
      'English | United States':'?hl=en-US&gl=US&ceid=US:en',
      'English | Zimbabwe':'?hl=en-ZW&gl=ZW&ceid=ZW:en',
      'Bahasa Indonesia | Indonesia':'?hl=id&gl=ID&ceid=ID%3Aid',
      'Čeština | Česko':'?hl=cs&gl=CZ&ceid=CZ%3Acs',
      'Deutsch | Deutschland':'?hl=de&gl=DE&ceid=DE%3Ade',
      'Deutsch | Österreich':'?hl=de&gl=AT&ceid=AT%3Ade',
      'Deutsch | Schweiz':'?hl=de&gl=CH&ceid=CH%3Ade',
      'Español | Argentina':'?hl=es-419&gl=AR&ceid=AR%3Aes-419',
      'Español | Chile':'?hl=es-419&gl=CL&ceid=CL%3Aes-419',
      'Español | Colombia':'?hl=es-419&gl=CO&ceid=CO%3Aes-419',
      'Español | Cuba':'?hl=es-419&gl=CU&ceid=CU%3Aes-419',
      'Español | Estados Unidos':'?hl=es-419&gl=US&ceid=US%3Aes-419',
      'Español | México':'?hl=es-419&gl=MX&ceid=MX%3Aes-419',
      'Español | Perú':'?hl=es-419&gl=PE&ceid=PE%3Aes-419',
      'Español | Venezuela':'?hl=es-419&gl=VE&ceid=VE%3Aes-419',
      'Français | Belgique':'?hl=fr&gl=BE&ceid=BE%3Afr',
      'Français | Canada':'?hl=fr-CA&gl=CA&ceid=CA:fr',
      'Français | France':'?hl=fr&gl=FR&ceid=FR%3Afr',
      'Français | Maroc':'?hl=fr&gl=MA&ceid=MA%3Afr',
      'Français | Sénégal':'?hl=fr&gl=SN&ceid=SN%3Afr',
      'Français | Suisse':'?hl=fr&gl=CH&ceid=CH%3Afr',
      'Italiano | Italia':'?hl=it&gl=IT&ceid=IT%3Ait',
      'Latviešu | Latvija':'?hl=lv&gl=LV&ceid=LV%3Alv',
      'Lietuvių | Lietuva':'?hl=lt&gl=LT&ceid=LT%3Alt',
      'Magyar | Magyarország':'?hl=hu&gl=HU&ceid=HU%3Ahu',
      'Nederlands | België':'?hl=nl&gl=BE&ceid=BE%3Anl',
      'Nederlands | Nederland':'?hl=nl&gl=NL&ceid=NL%3Anl',
      'Norsk | Norge':'?hl=no&gl=NO&ceid=NO%3Ano',
      'Polski | Polska':'?hl=pl&gl=PL&ceid=PL%3Apl',
      'Português | Brasil':'?hl=pt-BR&gl=BR&ceid=BR%3Apt-419',
      'Português | Portugal':'?hl=pt-PT&gl=PT&ceid=PT%3Apt-150',
      'Română | România':'?hl=ro&gl=RO&ceid=RO%3Aro',
      'Slovenčina | Slovensko':'?hl=sk&gl=SK&ceid=SK%3Ask',
      'Slovenščina | Slovenija':'?hl=sl&gl=SI&ceid=SI%3Asl',
      'Svenska | Sverige':'?hl=sv&gl=SE&ceid=SE%3Asv',
      'Tiếng Việt | Việt Nam':'?hl=vi&gl=VN&ceid=VN%3Avi',
      'Türkçe | Türkiye':'?hl=tr&gl=TR&ceid=TR%3Atr',
      'Ελληνικά | Ελλάδα':'?hl=el&gl=GR&ceid=GR%3Ael',
      'Български | България':'?hl=bg&gl=BG&ceid=BG%3Abg',
      'Русский | Россия':'?hl=ru&gl=RU&ceid=RU%3Aru',
      'Русский | Украина':'?hl=ru&gl=UA&ceid=UA%3Aru',
      'Српски | Србија':'?hl=sr&gl=RS&ceid=RS%3Asr',
      'Українська | Україна':'?hl=uk&gl=UA&ceid=UA%3Auk',
      'עברית | ישראל':'?hl=he&gl=IL&ceid=IL%3Ahe',
      'العربية | الإمارات العربية المتحدة':'?hl=ar&gl=AE&ceid=AE%3Aar',
      'العربية | المملكة العربية السعودية':'?hl=ar&gl=SA&ceid=SA%3Aar',
      'العربية | لبنان':'?hl=ar&gl=LB&ceid=LB%3Aar',
      'العربية | مصر':'?hl=ar&gl=EG&ceid=EG%3Aar',
      'मराठी | भारत':'?hl=mr&gl=IN&ceid=IN%3Amr',
      'हिन्दी | भारत':'?hl=hi&gl=IN&ceid=IN%3Ahi',
      'বাংলা | বাংলাদেশ':'?hl=bn&gl=BD&ceid=BD%3Abn',
      'தமிழ் | இந்தியா':'?hl=ta&gl=IN&ceid=IN%3Ata',
      'മലയാളം | ഇന്ത്യ':'?hl=ml&gl=IN&ceid=IN%3Aml',
      'తెలుగు | భారతదేశం':'?hl=te&gl=IN&ceid=IN%3Ate',
      'ไทย | ไทย':'?hl=th&gl=TH&ceid=TH%3Ath',
      '中文 | 中国':'?hl=zh-CN&gl=CN&ceid=CN:zh-Hans',
      '中文 | 台灣':'?hl=zh-TW&gl=TW&ceid=TW%3Azh-Hant',
      '中文 | 香港':'?hl=zh-HK&gl=HK&ceid=HK%3Azh-Hant',
      '한국어 | 대한민국':'?hl=ko&gl=KR&ceid=KR%3Ako',
     };
    //Add options for news locale
    var sel=document.getElementById("newsLocal");
    for(var el in locales) {
      var opt = document.createElement('option');
      opt.appendChild( document.createTextNode(el) );
      opt.value = locales[el]; 
      sel.appendChild(opt);  
    }
    if(localStorage.newsLocale == undefined)localStorage.newsLocale="?hl=en-US&gl=US&ceid=US:en";
    document.getElementById('newsLocal').value=localStorage.newsLocale;
    loadGNews();
    //Add swipe to delete on news items
    window.setTimeout(function () {addSwipeToDelete();},1000);
    window.setTimeout(function () {addSwipeToDelete();},2000);
  }

}
//Settings Stuff
  //Set all buttons color
  for(var i=0;i<21;i++)
    document.getElementById("set-color"+i).value=ntp_sett[0].colors[i];
  lionright=document.getElementsByClassName("li_onright");
  var ulcheck  =document.getElementsByName("lntpbg");
  for(var i=0;i<5;i++){
    if(ntp_sett[1].status[i]){
      lionright[i].style.display="inline";
      ulcheck[i].checked=true;
    }
  }
  var nStyle = localGet("bgNStyle");
  if (nStyle == undefined){nStyle = 1;root.style.setProperty("--ntp-c23",ntp_sett[1].c23);}
  ulcheck.forEach(element => {
    element.addEventListener( 'change', function() {
      if(this.checked) {
          ntp_sett[1].status[this.value]=1;
          ntp_bg_checkbox(this.value);
      } else {
          ntp_sett[1].status[this.value]=0;
          lionright[this.value].style.display="none";
          if(this.value=="2"){
            ntp_sett[1].c23 =(ntp_sett[1].status[1]?','+ntp_sett[1].gradientC:"");
            root.style.setProperty("--ntp-c23",ntp_sett[1].c23);
          }
      }
    });
  });
  //Set ntp background 
  function ntp_bg_checkbox(mode){
    switch(mode){
      case '0': lionright[0].style.display="inline";
                lionright[1].style.display="none";
                ulcheck[1].checked=false;
                for(i=3;i<5;i++){
                  lionright[i].style.display="none";
                  ulcheck[i].checked=false;
                }
                ntp_sett[1].c22=ntp_sett[1].solidC
                ntp_sett[1].c23='url(' +patternsURI[nStyle - 1]+')';
                if(! ulcheck[2].checked)ntp_sett[1].c23 ="url(0)";
                ntp_sett[1].c24='auto';
                
        break;
      case '1': lionright[1].style.display="inline";
              lionright[0].style.display="none";
                ulcheck[0].checked=false;
                for(i=3;i<5;i++){
                  lionright[i].style.display="none";
                  ulcheck[i].checked=false;
                }
                ntp_sett[1].c22=ntp_sett[1].gradientC;
                ntp_sett[1].c23='url('+patternsURI[nStyle - 1]+'),'+ntp_sett[1].gradientC;
                if(! ulcheck[2].checked)ntp_sett[1].c23 =ntp_sett[1].gradientC;
                ntp_sett[1].c24='auto';
        break;
      case '2': lionright[2].style.display="inline";
                for(i=3;i<5;i++){
                  lionright[i].style.display="none";
                  ulcheck[i].checked=false;
                }
                ntp_sett[1].c23='url(' +patternsURI[nStyle - 1]+')'+
                (ntp_sett[1].status[1]?','+ntp_sett[1].gradientC:"");
                ntp_sett[1].c24='auto';
        break;
      case '3': lionright[3].style.display="inline";
                for(i=0;i<3;i++){
                  lionright[i].style.display="none";
                  ulcheck[i].checked=false;
                }
                lionright[4].style.display="none";
                ulcheck[4].checked=false;
                ntp_sett[1].c23='url(' +ntp_sett[1].wallpaperURL+')';
                ntp_sett[1].c24='cover';
        break;
      case '4': lionright[4].style.display="inline";
                for(i=0;i<4;i++){
                  lionright[i].style.display="none";
                  ulcheck[i].checked=false;
                }
                ntp_sett[1].c23='url(' +ntp_sett[1].wallpaperFILE+')';
                ntp_sett[1].c24='cover';
        break;
    }
    root.style.setProperty("--ntp-c22",ntp_sett[1].c22);
    root.style.setProperty("--ntp-c23",ntp_sett[1].c23);
    root.style.setProperty("--ntp-c24",ntp_sett[1].c24);
    //Save status
    for(i=0;i<5;i++)
        ntp_sett[1].status[i]=(ulcheck[i].checked)?1:0;
    localStore("ntp_sett",ntp_sett);
  }
  //Function to set options radio
  function set_option_r(t,i){
    ntp_sett[2].options[i]=t.value;
    localStore("ntp_sett",ntp_sett);
  }
  function set_option_t(t,v,f,i){
    ntp_sett[2].options[i]=(t.checked)?v:f;
    localStore("ntp_sett",ntp_sett);
  }
  //Function to set solid color for ntp bg
  function set_color_property2(value){
    root.style.setProperty("--ntp-c22", value);
    ntp_sett[1].solidC=value;
    ntp_sett[1].c22=value;
    localStore("ntp_sett",ntp_sett);
  } 
  //Function change background to next style
  function nextStyle() {
    if (nStyle == 45) nStyle = 1;
    else nStyle++;
    localStore("bgNStyle", nStyle);
    ntp_sett[1].c23='url(' +patternsURI[nStyle - 1]+')'+(ntp_sett[1].status[1]?','+ntp_sett[1].gradientC:"");
    root.style.setProperty("--ntp-c23",ntp_sett[1].c23);
    
  }
  //Function change background to prev style
  function prevStyle() {
    if (nStyle == 1) nStyle = 45;
    else nStyle--;
    localStore("bgNStyle", nStyle);
    ntp_sett[1].c23='url(' +patternsURI[nStyle - 1]+')'+(ntp_sett[1].status[1]?','+ntp_sett[1].gradientC:"");
    root.style.setProperty("--ntp-c23",ntp_sett[1].c23);
    
  }
  //Function to apply setting property
  function set_color_property(y,value){
    root.style.setProperty("--ntp-c"+ y, value);
    ntp_sett[0].colors[y] =value;
    localStore("ntp_sett",ntp_sett);
  } 
  //Function to enter custom url image
  function cWallpaper1() {
    var url = prompt("Enter url of the wallpaper . \nExample : ", "url");
    var w = (window.innerWidth) ? window.innerWidth : screen.width;
    var h = (window.innerHeight) ? window.innerHeight: screen.height;
    var image= new Image();
    image.onload = function() {
        if(this.width < w || this.height <h || url == null){
          alert("The image dimensions doesn't fit your screen . \nImage : (" +this.width +"x"+this.height+")\nRequired :("+w+"x"+h+")");
          return;
        }
        root.style.setProperty("--ntp-c23",'url(' +url+')');
        ntp_sett[1].c23='url('+url+')';
        ntp_sett[1].wallpaperURL=url;  
        localStore("ntp_sett",ntp_sett);
    };
    image.src = (url);
  }
  //Function to enter custom file image
  function cWallpaper2() {
    var fData = document.getElementById('wallpaper_file');
    var FileUploadPath = fData.value;
    if (FileUploadPath == '') {
      alert("Please upload an image");
    } else {
      var Extension = FileUploadPath.substring(
        FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
      if (Extension == "gif" || Extension == "png" || Extension == "bmp" ||
        Extension == "jpeg" || Extension == "jpg") {
        if (fData.files && fData.files[0]) {
          var w = (window.innerWidth) ? window.innerWidth : screen.width;
          var h = (window.innerHeight) ? window.innerHeight: screen.height;
          var reader = new FileReader();
          reader.onload = function (e) {
            var imgsize=parseInt((fData.files[0].size)/1024);
            var img = new Image;
            img.onload = function() {
                if(img.width < w || img.height<h || (imgsize)>1024){
                alert("\nInput : ( " +img.width +" x "+img.height+" ) "+imgsize+" KB\nRequired : ( "+w+"x"+h+" or higher ) max 1 MB (1000 KB) \n");
                return;
              }
              root.style.setProperty("--ntp-c23",'url(' + e.target.result+')');
              ntp_sett[1].c23='url('+ e.target.result+')';
              ntp_sett[1].wallpaperFILE= e.target.result;  
              localStore("ntp_sett",ntp_sett);
            };
            img.src = reader.result;
            
          }
          reader.readAsDataURL(fData.files[0]);
        }
      } else {
        alert("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ");
      }
    }
  }
  //Function to generate gradient color
  function random_gradient(){
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
    ntp_sett[1].gradientC='radial-gradient(at top left, ' + colorOne.rgb + ', ' + colorTwo.rgb + ')';
    ntp_sett[1].c22=ntp_sett[1].gradientC;
    ntp_sett[1].c23='url('+patternsURI[nStyle - 1]+'),'+ntp_sett[1].gradientC;
    if(! ulcheck[2].checked)ntp_sett[1].c23 =ntp_sett[1].gradientC;
    root.style.setProperty("--ntp-c22",ntp_sett[1].c22);
    root.style.setProperty("--ntp-c23",ntp_sett[1].c23);
    localStore("ntp_sett",ntp_sett);
  }
  //Function to input custom RGB color
  function setCustomRGB(color, i) {
    c = prompt("Enter the RGB or RGBA color. \nExample : #d6d6d6 or #d6d6d6aa (aa is for transparency )", color);
    if (c != null) set_color_property( i,c);
  }
  //Create list for sorting widgets with handle
  Sortable.create(document.getElementById("listWidgetOrder"), {
    handle: '.my-handle',
    animation: 150,
    // Element dragging ended
    onEnd: function (evt) {
      var list = document.getElementById("listWidgetOrder").getElementsByTagName("li");
      console.log("1->> "+ntp_sett[0].order);
      for (var z = 0; z < list.length; z++){
        var y=list[z].getAttribute("data-order");
        ntp_sett[0].order[z] = y;
        var status = ntp_sett[0].status[z];
        var wdgn = document.getElementById("wdg-"+y);
        if(status){
          wdgn.style.display="block";
          customInner(wdgn, ntp_wdg[z].cached);
        }else{
          wdgn.style.display="none";
        }
      }
      localStore("ntp_sett", ntp_sett);//Save Settings
      console.log("2->> "+ntp_sett[0].order);
    }
  });
  //Create Swiper for settings
  var swiper_st = new Swiper('.swiper-c-intro', {
    speed: 400, //speed:  Fast|150 , Normal|450 , Slow|850 
    pagination: {
      el: '.swiper-p-intro',
      clickable: true,
    },
    effect: "slide",
    observer: true,
    observeParents: true,
    initialSlide: 0,
  });
  //Set logo on settings for icon bookmarks type
  var ar_klogo = document.getElementsByClassName("k-logo");
  for (var i = 0; i < ar_klogo.length; i++) ar_klogo[i].src = kiwiIcon;
  //Show&Close  Settings 
  function func_dlg_st(a) {
    document.getElementById("swip_kiwi_intro").style.display = "none";
    document.getElementById("dlg_st").style.display = (a) ? "inline" : "none";
    document.getElementById("dlg_st").style.opacity = a;
    needReload = 0;
  }
  //Function to slide
  function func_st_page(i) {
    swiper_st.slideTo(i, 10, false);
  }
  //Function to export NTP settings and widgets
  document.getElementById('exportJSON').onclick = function () {
    var localStorageCopy = JSON.parse(JSON.stringify(localStorage));
    var keys = Object.keys(localStorageCopy),i = keys.length;
    while (i--) {
      if (keys[i].startsWith('cached') || keys[i].startsWith('icon-'))
        delete localStorageCopy[keys[i]];
    }
    var dataStr = JSON.stringify(localStorageCopy);
    var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    var date = new Date();
    var exportFileDefaultName = 'ntpB_' + date.getUTCFullYear() + '' + (date.getUTCMonth() + 1) + '' + date.getUTCDate() + '_' + 
    date.getHours() + '-' + date.getMinutes() + '.json';
    var linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
  //Function to import NTP settings and widgets
  document.getElementById('file').onchange = function () {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function (progressEvent) {
      var test = this.result;
      var test2 = JSON.parse(test);
      var values = Object.values(test2),
        keys = Object.keys(test2),
        i = keys.length;
      while (i--) {
        localStorage.setItem(keys[i], values[i]);
      }
    };
    reader.readAsText(file);
    needReload = 1;
  };
  //Function to retrieve number of cols
  function getNumberOfCols() {
    if (wid > 253 && wid < 337) {
      return 3;
    } else if (wid > 336 && wid < 421) {
      return 4;
    } else if (wid > 420 && wid < 510) {
      return 5;
    } else if (wid > 509 && wid < 672) {
      return 6;
    } else if (wid > 672) {
      return 8;
    }
  }
  //Function to add cols
  function addColRow() {
    var el = document.getElementById('nColsLabel');
    var t = parseInt(el.textContent);
    if (t < 8) {
      el.textContent = t + 1;
    }
    localStore("itemsPerRow", el.textContent);
    setColRow();
    needReload = 1;
  }
  //Function to remove cols
  function removeColRow() {
    var el = document.getElementById('nColsLabel');
    var t = el.textContent;
    if (t > 3) el.textContent = t - 1;
    localStore("itemsPerRow", el.textContent);
    setColRow();
    needReload = 1;
  }
  var wid = (window.innerWidth) ? window.innerWidth : screen.width;
  var userColC = getNumberOfCols();
  //Function to edit cols
  function setColRow() {
    var cols = getNumberOfCols();
    var c = localGet("itemsPerRow");
    if (c) {
      userColC = c;
      document.getElementById('nColsLabel').textContent = userColC;
    }
    //Standard 64 px + 20 px
    var tWidth = 64;
    var tMargin = 20;
    if (userColC > cols) {
      var calcCOL = (userColC * (tWidth + tMargin)) + 1;
      while (calcCOL > wid) {
        calcCOL = (userColC * (tWidth + tMargin)) + 1;
        if (tMargin > 10)tMargin -= 1;
        else tWidth -= 1;
      }
    }
    root.style.setProperty("--column-count", userColC);
    root.style.setProperty("--tile-width", tWidth + 'px');
    root.style.setProperty("--tile-margin", tMargin + 'px');
  }
  setColRow();
  
  //Show  old changelog
  function show_old_changelog() {
    var x = document.getElementById("old-changelog");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


  //Load Theme Color
  var metaThemeColor = document.querySelector("meta[name=theme-color]");
  metaThemeColor.setAttribute("content", ntp_sett[0].colors[3]);


  function test_log() {
    test;
  }

 
  
  //Function for settings dialog
  function func_dlg_st(a) {
    func_st_page(0);
    document.getElementById("dlg_st").style.display = (a) ? "inline" : "none";
    document.getElementById("dlg_st").style.opacity = a;
    needReload = 0;
  }

/* Get the documentElement (<html>) to display the page in fullscreen */
var needReload = 0;
//Function to manage Floating Button
function fabAction() {
  var el = document.getElementById('floating-btn');
  el.classList.toggle('open');
  if (el.classList.contains('open')) {
    document.getElementById("fb-btn").innerHTML = '<i class="far fa-times"></i>';
  } else {
    document.getElementById("fb-btn").innerHTML = '<i class="fas fa-caret-up"></i>';
  }
}
// Uh , what's up
  var start;
 var end;
 var delta;
 var button = document.getElementById("fb-eg");
 button.addEventListener("touchstart", function(){
   start = new Date();
 });
 button.addEventListener("touchend", function(e) {
   end = new Date();
   delta = end - start;
    if (delta > 5000) {
      document.getElementById("dlg_eg").style.display = "inline";
      document.getElementById("dlg_eg").style.opacity = 1;
      e.preventDefault();
    }
 });
 function close_eg(){
  document.getElementById("dlg_eg").style.display = "none";
  document.getElementById("dlg_eg").style.opacity = 0;
 }

function preconnectTo(url) {
  var hint = document.createElement("link");
  hint.rel = "preconnect";
  hint.href = url;
  document.head.appendChild(hint);
}

 //Check ntpVersion
 if (localStorage.ntpVersion) {
  if (localStorage.ntpVersion != "3.0.0") {
    localStorage.ntpVersion = "3.0.0";
    func_dlg_st(1);func_st_page(10);
  }
} else {
  localStorage.ntpVersion = "3.0.0";
  func_dlg_st(1);func_st_page(10);
}
//Show NTP ( should reduce the flash effect )
document.getElementById('bdy').classList.add('inited');

document.getElementById("logC_section").innerHTML=localGet("cached-logC");
function clear_log(){
  localStore("cached-logC","");
  document.getElementById("logC_section").innerHTML="";
}
function export_logfile(){
  var dataStr = localGet("cached-logC");
  dataStr.replace("<br>","\\n");
  var dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(dataStr);
  var exportFileDefaultName = 'ntpLog_.text';
  var linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}