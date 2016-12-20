var App = angular.module('App');

App.controller('home',home);
App.controller('single',single);

home.$inject = ['$scope','Products','$q','$routeParams','$location'];
function home($s,P,$q,$route,$l){
    $s.userId = "582fbd9cfc130396ed91d8e5";
    $s.cP = 1;
    $s.pS = 4;
    $s.prd = [];
    $s.getData = function(pageno){
        P.getAll({userId: $s.userId ,cursor: pageno, item: $s.pS},function(e,r){
            if(r){
                $s.imageUrl = r.baseImage;
                $s.prd = r.data;
                console.log($s.prd);
                console.log($s.imageUrl);
                
            }
        });
    };
    
    P.count({userId: $s.userId},function(e,res){
        if(res){
            console.log(res.data);
            $s.total_count = res.data;
        }
    });
    
    $s.getData(1);
    
    
}

single.$inject = ['$scope','Products','$q','$routeParams','$location','$sce'];
function single($s,P,$q,$route,$l,$sce){
    console.log($route.id);
    $s.userId = "582fbd9cfc130396ed91d8e5";
    $s.prd = [];
    P.getOne({productId: $route.id},function(e,r){
        if(r){
            $s.showThumb = true;
            $s.image = [];
            $s.nick = [];
            console.log(r);
            $s.imageUrl = r.baseImage;
            
            $s.prd = r.data[0];
            
            $s.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml($s.prd.spesification);
            $s.prd.thisCanBeusedInsideNgBindHtml = $s.thisCanBeusedInsideNgBindHtml;
            
            console.log($s.prd);
            
            if($s.prd.category == 0){
                $s.showCat = false;
            }
            else{
                $s.showCat = true;
            }
            
            $s.ln = $s.prd.R_productFile.length;
            if($s.prd.R_productFile.length !== 0){
                for(var i = 0;i<$s.ln;i++){
                    $s.image.push($s.imageUrl+$s.prd.R_productFile[i].valueImage);
                };
            }
            else if($s.prd.R_productFile.length == 0){
                $s.image.push($s.imageUrl+'no-image.png');                
            }
            $s.resize($s.image.length);
            $s.images = $s.image[0];
                console.log($s.image);
        }
    });
    
    $s.prd = [];
    $s.getData = function(pageno){
        P.getAll({userId: $s.userId, cursor: pageno, item: 3},function(e,r){
            if(r){
                $s.width2 = "215px";
                $s.height2 = "215px";
                $s.imageUrl = r.baseImage;
                $s.prod = r.data;
                $s.len = $s.prod.length;
                for(var t=0;t<$s.len;t++){
                    if($s.prod[t].R_productFile.length !== 0){
                        $s.prod[t].altName2 = $s.prod[t].R_productFile[0].valueImage;
                        $s.prod[t].image2 = $s.imageUrl+$s.prod[t].R_productFile[0].valueImage;
                    }
                    else{
                        $s.prod[t].altName2 = 'no-image.png';
                        $s.prod[t].image2 = $s.imageUrl+'no-image.png';
                    }
                };
                console.log($s.prod);
            }
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
                        $s.prds[t].image3 = $s.imageUrl+$s.prds[t].R_productFile[0].valueImage;
                    }
                    else{
                        $s.prds[t].altName3 = 'no-image.png';
                        $s.prds[t].image3 = $s.imageUrl+'no-image.png';
                    }
                };
                console.log($s.prds);
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
            console.log('categories---------------');
            console.log(r.data);
            $s.cat = r.data;
        }
    });
    
    
}

/*tampilan masih semrawut bagian margin dan padding dan untuk col med 3 atau col bottom masih belum bisa disamping seharusnya tempatnya disamping*/