#include<iostream>
#include<map>
using namespace std;

// scanf(" %[^\n]s",s);
map<char, int> encryptionLower;
map<char, int> encryptionUpper;

void initialize(){
    for(int i=65; i<=90; i++)
        encryptionUpper[i]=(i-65);

    for(int i=97; i<=122; i++)
        encryptionLower[i]=(i-97);
}

string encrypt(){
    string text;
    cout<<"\nEnter the text : ";
    cin.ignore();
    getline(cin, text);
    int key;
    cout<<"Enter the key : ";
    cin>>key;

    key %= 26;

    string decryptedText="";
    for(int i=0; i<text.size(); i++){
        if(encryptionLower.find(text[i])!=encryptionLower.end()){

            int newIdx = (encryptionLower[text[i]]+key)%26;
            int s = newIdx;
            auto it = encryptionLower.begin();
            while(s--){
                it++;
            }
            decryptedText.push_back(it->first);
        }

        else if(encryptionUpper.find(text[i])!=encryptionUpper.end()){

            int newIdx = (encryptionUpper[text[i]]+key)%26;
            int s = newIdx;
            auto it = encryptionUpper.begin();
            while(s--){
                it++;
            }
            decryptedText.push_back(it->first);
        }

        else if(text[i]==' '){
            decryptedText.push_back(' ');
        }
    }
    return decryptedText;
}

string decrypt(){
    string text;
    cout<<"\nEnter the text : ";
    cin.ignore();
    getline(cin, text);
    int key;
    cout<<"Enter the key : ";
    cin>>key;

    key = key%26;
    key = 26-key;

    string decryptedText="";
    for(int i=0; i<text.size(); i++){
        if(encryptionLower.find(text[i])!=encryptionLower.end()){

            int newIdx = (encryptionLower[text[i]]+key)%26;
            int s = newIdx;
            auto it = encryptionLower.begin();
            while(s--){
                it++;
            }
            decryptedText.push_back(it->first);
        }

        else if(encryptionUpper.find(text[i])!=encryptionUpper.end()){
            
            int newIdx = (encryptionUpper[text[i]]+key)%26;
            int s = newIdx;
            auto it = encryptionUpper.begin();
            while(s--){
                it++;
            }
            decryptedText.push_back(it->first);
        }

        else if(text[i]==' '){
            decryptedText.push_back(' ');
        }
    }
    return decryptedText;
}

int main(){
    initialize();

    cout<<"Menu driven program : ";
    cout<<"\nPress 1 to Encrypt a text";
    cout<<"\nPress 2 to Decrypt a text";
    cout<<"\nPress 3 to exit";

    while(1){
        cout<<"\nEnter your choice : ";
        int ch;
        cin>>ch;

        switch(ch){
            case 1 : cout<<encrypt()<<endl;
                    break;
            case 2 : cout<<decrypt()<<endl;
                    break;
            case 3 : exit(0);
            default : cout<<"\nWrong choice";
                    break;
        }
    }

    return 0;
}

// "Japan is country"
// "Kbqbo jt dpvousz"