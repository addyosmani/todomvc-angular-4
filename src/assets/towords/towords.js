var th = ['','mille','million', 'milliard','billion'];

var dg = ['','un','deux','trois','quatre', 'cinq','six','sept','huit','neuf']; 
var tn =    ['dix','onze','douze','treize', 'quartoze','quinze','seize', 'dix-sept','dix-huit','dix-neuf']; 
var tw = ['vingt','trente','quarante','cinquante', 'soixante','soixante', 'quatre-vingt','quatre-vingt']; 

function toWords(nbr){
    nbr = nbr.toString(); 
    nbr = nbr.replace(/[\, ]/g,''); 
    if (nbr != parseFloat(nbr)) return 'not a number'; 
    var x = nbr.indexOf('.'); 
    if (x == -1) x = nbr.length; if (x > 15) return 'too big';
    var n = nbr.split(''); 
    var str = '';  
    var sk = 0;
    var _nbr = parseFloat(nbr);
    var units = _nbr % 10,
    tens = (_nbr % 100 - units) / 10,
    hundreds = (_nbr % 1000 - _nbr % 100) / 100;
    var isNnTh = false;
    
    for (var i=0; i < x; i++) {
        
        if((x-i)%3==2) {				
            if (n[i] == '1') {
                str += tn[Number(n[i+1])] + ' '; i++; sk=1;					
            } else if (n[i]!=0) {	
                if(n[i] == '7' || n[i] == '9') isNnTh = true;
                str += tw[n[i]-2] + ' ';sk=1;					
            }				
            
        } else if (n[i]!=0) {
        
            if ((x-i)%3==0){				
                if (n[i] == '1'){
                    str += 'cent ';						
                }else{					
                    str += dg[n[i]] +' '; 
                    str += 'cents ';
                }
                sk=1;
            }else if ((x-i)%4==0){
                
                if (n[i] == '1' && x == '4'){
                    str += th[1] + ' ';						
                }else{		
                    if(isNnTh){
                        str += tn[n[i]] +' ';
                        str += th[1] + ' ';
                    }else{
                        str += dg[n[i]] +' ';
                        str += th[1] + ' ';
                    }
                    
                }sk=0;
            }else{  
                                
                var temp = nbr.substring(i, x);
                
                if((tens === 7 || tens === 9)){
                    
                    if(isNnTh){
                        str += tn[n[i]] +' ';
                    }else{
                    str += dg[n[i]] +' ';
                    }
                    
                }else{					
                    str += dg[n[i]] +' ';
                }
                
                if ((x-i)%3==0) str += 'cent ';sk=1;						
            }
            
        } if ((x-i)%3==1) {						
            if (sk) str += th[(x-i-1)/3] + ' ';sk=0;
        }else{				
            if(x-i == '8' && (n[i] == '7' || n[i] == '9'))isNnTh = true;				
        }
    }  

    return str.trim();
}