#include<bits/stdc++.h>
using namespace std;

unordered_map<char, int> mp;

char sc[] = {'!','@','#','$','%','^','&','*','(',')',':'};
bool findSpecialChar(string s){
    for(auto c:s){
        for(int i=0; i<11; i++){
            if(c==sc[i])
                return true;
        }
    }
    return false;
}

string decToBinary(int no){
    string str;
    while(no){
        if(no & 1)
            str.insert(0,"1");
        else{
            str.insert(0,"0");
        }
        no = no>>1;
    }
    
    if(str.size()==5)
        return str;
    
    while(str.size()!=5){
        str.insert(0, "0");
    }
    return str;
}

void removeSpaces(string &s){
    int n=s.size();
    for(int i=0; i<n; i++){
        if(s[i]==' '){
            for(int j=i; j<n; j++){
                s[j]=s[j+1];
            }
        s.pop_back();
        }
    }
}

void encrypt(string s, string sentence){
    string encryptedText;
    int k=0;
    for(int i=0; i<s.size(); i++){
        int no = mp[s[i]];
        string getBinary = decToBinary(no);
        
        int j=0;
        while(j<5){
            if(sentence[k]==' '){
                encryptedText.push_back(' ');
                k++;
            }
            else{
                if(getBinary[j]=='1')
                    encryptedText.push_back(toupper(sentence[k]));
                else if(getBinary[j]=='0')
                    encryptedText.push_back(tolower(sentence[k]));
                k++;
                j++;    
            }
        }
    }
    cout<<"\nEncrypted Text : "<<encryptedText;
}

int binaryTodeci(string no){
    int bNo = stoi(no);
    int number=0, k=1;
    while(bNo>0){
        int digit=bNo%10;
        number= number + k*digit;
        k=k*2;
        bNo = bNo/10;
    }
    return number;
}

void decrypt(string s){
    string decryptedText;
    string binarystring;
    for(int i=0; i<s.size(); i++){
        if(isupper(s[i]))
            binarystring.push_back('1');
        else    
            binarystring.push_back('0');
    }

    vector<int> v;
    int i=0,n=s.size();
    while(i<n-4){
        string sbstr = binarystring.substr(i,5);
        int deciNo = binaryTodeci(sbstr);
        v.push_back(deciNo);
        i+=5;
    }

    for(auto i:v){
        for(auto &[key,val]:mp){
            if(val==i)
                decryptedText.push_back(key);
        }
    }

    cout<<"\nDecrypted Text : "<<decryptedText;
}

int main(){
    // string s="AttackNow";
    // string sentence = "Computer Network Will Be Held In Room No One Zero PLease Come to That Room";
    // string sentence2 = "compUTeR neTwOrk will Be heLD iN rOOm NO One ZERO PlEAS";

    for(int i=0; i<26; i++){
        mp[97+i]=i+1;
    }

    cout<<"Soban Farooq \nRoll No : 20BCS049";
    cout<<"\nPress 1 to encrypt string using Bakonian cypher";
    cout<<"\nPress 2 to decrypt string using Bakonian cypher";
    cout<<"\nPress 3 to exit";
    string s, sen1, sen2;

    while(1){
        cout<<"\nEnter your choice : ";
        int ch;
        cin>>ch;

        switch(ch){
            case 1 :
                cout<<"\nEnter a string : ";
                cin.ignore();
                getline(cin, s);

                if(findSpecialChar(s)){
                    cout<<"\nString cannot have special characters!";
                    break;
                }

                cout<<"\nEnter the sentence : ";
                getline(cin, sen1);

                if(sen1.size()<5*s.size()){
                    cout<<"\nInput sentence length should be 5 times greater than string to be encrypted!";
                    break;
                }

                transform(s.begin(), s.end(), s.begin(), ::tolower);
                removeSpaces(s);
                encrypt(s,sen1);
                break;

            case 2 : 
                cout<<"\nEnter the string to decrypt : ";
                cin.ignore();
                getline(cin, sen2);
                
                removeSpaces(sen2);
                decrypt(sen2);
                break;
            
            case 3 : exit(0);
            default : cout<<"\nWrong choice! Enter one again : ";
                        break;
        }
    }
    return 0;
}