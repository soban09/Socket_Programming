#include<iostream>
#include<vector>
using namespace std;

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

vector<vector<char>> encrypt(string str, int key){
    int n=str.length();
    int rows = n/key;
    vector<vector<char>> matrix(rows+1, vector<char>(key, ' '));

    int k=0, j=0;
    for(int i=0; i<=rows; i++){
        j=0;
        while(j<key && k<n){
            matrix[i][j++]=str[k++];
        }
    }
    string enc = "JMI";
    k=0;
    while(j<key){
        matrix[rows][j++]=enc[k];
        k=(k+1)%3;
    }

    // encrypted string :
    string str2="";
    for(int j=0; j<key; j++){
        for(int i=0; i<=rows; i++){
            str2.push_back(matrix[i][j]);
        }
    }
    cout<<"\nEncrypted Key : "<<str2<<endl;
    return matrix;
}

void decrypt(string str, int n, int key, int rows){
    vector<vector<char>> matrix(rows, vector<char>(key, ' '));
    int k=0;
    for(int j=0; j<key; j++){
        int i=0;
        while(i<rows && k<n)
            matrix[i++][j]=str[k++];
    }

    string str2 = "";
    for(int i=0; i<rows-1; i++){
        for(int j=0; j<key; j++)
            str2.push_back(matrix[i][j]);
    }
    int j=0;
    while(j<key && matrix[rows-1][j]!='J')
        str2.push_back(matrix[rows-1][j++]);
    cout<<str2<<endl;
}

int main(){
    cout<<"Soban Farooq \nRoll No : 20BCS049";
    cout<<"\nPress 1 to encrypt string using Transposition cipher";
    cout<<"\nPress 2 to decrypt string using Transposition cipher";
    cout<<"\nPress 3 to exit";
    vector<vector<char>> matrix;
    string str, str2;
    int key, n, rows;


    while(1){
        cout<<"\nEnter your choice : ";
        int ch;
        cin>>ch;

        // Sample : ThisIsAComputerNetworkLab0JMIJ

        switch(ch){
            case 1 :
                cout<<"\nEnter a string (no spaces) : ";
                cin>>str;
                cout<<"\nEnter the key : ";
                cin>>key;

                if(key>=str.size()){
                    cout<<"\nKey cannot be greater than string size!";
                    break;
                }
                if(findSpecialChar(str)){
                    cout<<"\nString cannot have special characters!";
                    break;
                }
                matrix = encrypt(str, key);
                break;

            case 2 : 
                cout<<"\nEnter the string to decrypt : ";
                cin>>str2;

                cout<<"\nEnter the key : ";
                cin>>key;

                n=str2.size();
                if(n%key!=0){
                    cout<<"\nEnter a valid decrypt string : ";
                    break;
                }
                rows=n/key;
                decrypt(str2, n, key, rows);
                break;
            
            case 3 : exit(0);
            default : cout<<"\nWrong choice! Enter one again : ";
                        break;
        }
    }
    
    return 0;
}
