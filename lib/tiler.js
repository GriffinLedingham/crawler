//





var tileLibrary = {
  walltop_w   : 0,
  walltop     : 1,
  walltop_e   : 2,
  walltop_cntr  : 3,
  blank       : 4,

  wallface_w    : 5,
  wallface      : 6,
  wallface_e    : 7,
  wallface_cntr : 8,

  floorwall_w   : 10,
  floorwall     : 11,
  floorwall_e   : 12,
  floorwall_cntr: 13,
  blankwall     : 14,

  floor         : 15,
  floor_1       : 16,
  floor_2       : 17,
};


















var tileMapTranslate = function (map) {
  var spriteMap=[];
  var i,j,tile;
  var N,S,E,W,NE,NW,SE,SW;
  var map_size = map.length;


  for (i=0; i<map_size; i++) {
    spriteMap[i]=[];
    for(j=0; j<map_size; j++) {
      spriteMap[i][j] = tileLibrary.blank;
    }
  }

  console.log(spriteMap);





  for (j=1; j<map_size-1; j++) {
    for(i=1; i<map_size-1; i++) {
      tile = map[i][j];

      N = map[i][j-1];
      S = map[i][j+1];
      E = map[i+1][j];
      W = map[i-1][j];
      NE = map[i+1][j-1];
      NW = map[i-1][j-1];
      SE = map[i+1][j+1];
      SW = map[i-1][j+1];


      if(tile==0) {
        if(S!=0 || N!=0){


          spriteMap[i][j] = tileLibrary.wallface;
        } else if(E!=0 || W!=0 || SE!=0 || SW!=0){




          spriteMap[i][j] = tileLibrary.walltop;
        } else if(NE!=0 || NW!=0){


          spriteMap[i][j] = tileLibrary.wallface;
        }

      } else {

        spriteMap[i][j] = randTile([tileLibrary.floor,tileLibrary.floor_1,tileLibrary.floor_2],[1,0.05,0.05]);
      }
    }
  }


  for (j=1; j<map_size-1; j++) {
    for(i=1; i<map_size-1; i++) {
      tile = spriteMap[i][j];

      N = spriteMap[i][j-1];
      S = spriteMap[i][j+1];
      E = spriteMap[i+1][j];
      W = spriteMap[i-1][j];
      NE = spriteMap[i+1][j-1];
      NW = spriteMap[i-1][j-1];
      SE = spriteMap[i+1][j+1];
      SW = spriteMap[i-1][j+1];


      if(isWallface(tile) && isWalltop(S) ){
        spriteMap[i][j] = tileLibrary.walltop;
      } else if(isWallface(tile) && isWallface(S)){
        spriteMap[i][j] = tileLibrary.walltop;
      }


      else if(isFloor(tile) && isWallface(N)){
        spriteMap[i][j] = tileLibrary.floorwall;
      } else if (tile==tileLibrary.blank && isWallface(N)){
        spriteMap[i][j] = tileLibrary.blankwall;
      }
    }
  }


  for (j=1; j<map_size-1; j++) {
    for(i=1; i<map_size-1; i++) {
      tile = spriteMap[i][j];

      N = spriteMap[i][j-1];
      S = spriteMap[i][j+1];
      E = spriteMap[i+1][j];
      W = spriteMap[i-1][j];


      if(isWallface(tile) && (isFloor(W)||isFloorwall(W))){
        spriteMap[i][j] = tileLibrary.wallface_w;
      } else if(isWallface(tile) && (isFloor(E)||isFloorwall(E))){
        spriteMap[i][j] = tileLibrary.wallface_e;
      }

      else if(isFloorwall(tile) && isFloor(W)){
        spriteMap[i][j] = tileLibrary.floorwall_w;
      } else if(isFloorwall(tile) && isFloor(E)){
        spriteMap[i][j] = tileLibrary.floorwall_e;
      }

      else if(isWalltop(tile) && isFloor(W) && isFloor(N)){
        spriteMap[i][j] = tileLibrary.walltop_w;
      } else if(isWalltop(tile) && isFloor(E) && isFloor(N)){
        spriteMap[i][j] = tileLibrary.walltop_e;
      }


      if((isFloor(W) || isFloorwall(W)) && (isFloor(E) || isFloorwall(E))) {
        if(isWalltop(tile) && isFloor(N)){
          spriteMap[i][j] = tileLibrary.walltop_cntr;
        } else if(isWallface(tile) && (isFloor(S) || isFloorwall(S))){
          spriteMap[i][j] = tileLibrary.wallface_cntr;
        }
      }

      if(isFloorwall(tile) && N==tileLibrary.wallface_cntr){
        spriteMap[i][j] = tileLibrary.floorwall_cntr;
      }

    }
  }

  return spriteMap;
}



var isWallface = function(tile){
  if(tile==tileLibrary.wallface
    || tile==tileLibrary.wallface_e
    || tile==tileLibrary.wallface_w
    || tile==tileLibrary.wallface_cntr) return 1;
  else return 0;
}


var isWalltop = function(tile){
  if(tile==tileLibrary.walltop
    || tile==tileLibrary.walltop_e
    || tile==tileLibrary.walltop_w
    || tile==tileLibrary.walltop_cntr ) return 1;
  else return 0;
}


var isFloorwall = function(tile){
  if(tile==tileLibrary.floorwall
    || tile==tileLibrary.floorwall_e
    || tile==tileLibrary.floorwall_w
    || tile==tileLibrary.floorwall_cntr ) return 1;
  else return 0;
}


var isFloor = function(tile){
  if(tile==tileLibrary.floor
    || tile==tileLibrary.floor_1
    || tile==tileLibrary.floor_2) return 1;
  else return 0;
}



var randTile = function(tileList,chance){
  if(tileList.length == 1){return tileList[0];}

  var sel=0;
  for(var i=1; i<tileList.length; i++) {
    if(Math.random() <= chance[i]){
      sel = i;
      break;
    }
  }

  return tileList[sel];
}