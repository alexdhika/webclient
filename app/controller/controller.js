var App = angular.module('App');

App.controller('home',home);
App.controller('single',single);

home.$inject = ['$scope','Products','$q','$routeParams','$location'];
function home($s,P,$q,$route,$l){
    $s.userId = "582fbd9cfc130396ed91d8e5";
    $s.cP = 1;
    $s.pS = 4;
    $s.getData = function(pageno){
        $s.prd = [];
        P.getAll({userId: $s.userId ,cursor: pageno, item: $s.pS},function(e,r){
            if(r){
                if(typeof(r.data.name) !== 'undefined'){
                    $s.imageUrl = r.baseImage;
                    $s.prd = r.data;
                }
                else{
                    $s.imageUrl = r.baseImage;
                    for(var y=0;y<r.data.length;y++){
                        $s.prd.push(r.data[y]);
                    }
                }
            }
        });
    };
    $s.getData(1);
    P.count({userId: $s.userId},function(e,res){
        if(res){
            $s.total_count = res.data;
        }
    });
    
}

single.$inject = ['$scope','Products','$q','$routeParams','$location','$sce'];
function single($s,P,$q,$route,$l,$sce){
    $s.userId = "582fbd9cfc130396ed91d8e5";
    P.getOne({productId: $route.id},function(e,r){
        if(r){
            $s.showThumb = true;
            $s.image = [];
            $s.nick = [];
            $s.imageUrl = r.baseImage;
            $s.prd = r.data[0];
            $s.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml($s.prd.spesification);
            $s.prd.thisCanBeusedInsideNgBindHtml = $s.thisCanBeusedInsideNgBindHtml;
            if($s.prd.category == 0){
                $s.showCat = false;
            }
            else{
                $s.showCat = true;
            }
            
            $s.ln = $s.prd.R_productFile.length;
            if($s.prd.R_productFile.length !== 0){
                for(var i = 0;i<$s.ln;i++){
                    $s.image.push($s.imageUrl+$s.prd.ownerId+"/"+$s.prd.R_productFile[i].valueImage);
                };
            }
            else if($s.prd.R_productFile.length == 0){
                $s.image.push($s.imageUrl+'no-image.png');                
            }
            $s.resize($s.image.length);
            $s.images = $s.image[0];
        }
    });
    $s.prd = [];
    $s.getData = function(pageno){
        P.count({userId: $s.userId},function(e,res){
            if(res){
                $s.total_count = res.data;
                $s.prdx = [];
                $s.prs = [];
                $s.prdz = [];
                P.getAll({userId: $s.userId, cursor: pageno, item: $s.total_count},function(e,r){
                    if(r){
                        $s.width2 = "215px";
                        $s.height2 = "215px";
                        $s.imageUrl = r.baseImage;
                        $s.prod = r.data;
                        $s.len = $s.prod.length;
                        for(var t=0;t<$s.len;t++){
                            if($s.prod[t].R_productFile.length !== 0){
                                $s.prod[t].altName2 = $s.prod[t].R_productFile[0].valueImage;
                                $s.prod[t].image2 = $s.imageUrl+$s.prod[t].ownerId+"/"+$s.prod[t].R_productFile[0].valueImage;
                            }
                            else{
                                $s.prod[t].altName2 = 'no-image.png';
                                $s.prod[t].image2 = $s.imageUrl+'no-image.png';
                            }
                        };
                        if($s.len % 3 == 0){
                            $s.l = $s.len / 3;
                            for(var n=0;n<$s.l;n++){
                                if(n !== $s.l){
                                    for(var y=n*3;y<(n+1)*3;y++){
                                        $s.prdx.push($s.prod[y]);
                                        if($s.prdx.length == 3){
                                            $s.prs.push($s.prdx);
                                            $s.prdx = [];
                                        }
                                    };
                                }
                            };
                        }
                        else{
                            $s.l = $s.len / 3;
                            $s.a = Math.trunc($s.l);
                            $s.b = $s.a+1;
                            for(var n=0;n<$s.b;n++){
                                if(n !== $s.b){
                                    for(var y=n*3;y<(n+1)*3;y++){
                                        $s.prdx.push($s.prod[y]);
                                        if($s.prdx.length == 3){
                                            for(var z=0;z<$s.prdx.length;z++){
                                                if(typeof($s.prdx[z]) == 'undefined'){
                                                    $s.prdx.splice(z, 2);
                                                }
                                            };
                                            $s.prs.push($s.prdx);
                                            $s.prdx = [];
                                        }
                                    };
                                }
                            };
                        }
                    }
                            $s.pr = [];
                            $s.pr.push($s.prs);
                });

                P.getAll({userId: $s.userId, cursor: pageno, item: 5},function(e,r){
                    if(r){
                        $s.width3 = "50px";
                        $s.height3 = "50px";
                        $s.imageUrl = r.baseImage;
                        $s.prds = r.data;
                        $s.len = $s.prds.length;
                        for(var t=0;t<$s.len;t++){
                            $s.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml($s.prds[t].spesification);
                            $s.prds[t].thisCanBeusedInsideNgBindHtml = $s.thisCanBeusedInsideNgBindHtml;
                            if($s.prds[t].R_productFile.length !== 0){
                                $s.prds[t].altName3 = $s.prds[t].R_productFile[0].valueImage;
                                $s.prds[t].image3 = $s.imageUrl+$s.prds[t].ownerId+"/"+$s.prds[t].R_productFile[0].valueImage;
                            }
                            else{
                                $s.prds[t].altName3 = 'no-image.png';
                                $s.prds[t].image3 = $s.imageUrl+'no-image.png';
                            }
                        };
                    }
                });
            }
        });
        
    };
    $s.getData(1);
    $s.changeImage = function(input){
        $s.images = input;
    };
    
    $s.resize = function(inpt){
        if(inpt == 1){
            $s.showThumb = false;
        }
        else{
            $s.width = "95px";
            $s.height = "100px";
        }
    };
    
    P.getCat({},function(e,r){
        if(r){
            $s.cat = r.data;
        }
    });
}