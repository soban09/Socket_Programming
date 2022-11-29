#include<bits/stdc++.h>
#include<vector>
using namespace std;

using pii = pair<int,int>;

pii check(vector<vector<char>> &v, char ch){
	for(int i=0;i<5;i++){
		for(int j=0;j<5;j++){
			if(v[i][j]==ch)
				return {i,j};
		}
	}
	return {-1,-1};
}

void fun()
{
	string s;
	cout<<"\nEnter the string : ";
	getline(cin,s);
	// cin.ignore();
	string s1;

	for(auto it: s){
		if(it!=' ')
			s1.push_back(it);
	}
	transform(s1.begin(), s1.end(), s1.begin(), ::tolower);

	cout<<"Enter key : ";
	string key;
	cin>>key;
	transform(key.begin(), key.end(), key.begin(), ::tolower);

	for(int i=0;i<key.length();i++){
		if(key[i]=='j')
			key[i]='i';
	}
	
	// cout<<key[i]<<endl;
	vector<vector<char>> mat(5,vector<char> (5));
	int row=0;
	int col=0;
	set<char> st;

	for(int i=0;i<key.length();i++){

		if(st.find(key[i])==st.end()){

			if(col==5){
				row+=1;
				col=0;
				mat[row][col]=key[i];
				col++;
			}
			else{
				mat[row][col]=key[i];
				col++;
			}
			st.insert(key[i]);
		}
	}

	for(char ch='a';ch<='z';ch++){

		if(st.find(ch)==st.end() && ch!='j'){
			
			if(col==5){
				row+=1;
				col=0;
				mat[row][col]=ch;
				col++;
			} 
			else{
				mat[row][col]=ch;
				col++;
			}
			st.insert(ch);	
		}
	}
	for(auto it: mat){
		for(auto itt: it)
			cout<<itt<<" ";
		cout<<endl;
	}

	if(s1.length()%2)
		s1.push_back('x');

	string original =s1;
	string enc;

	for(int i=0;i<s1.length();i+=2){
		
		if(s1[i]==s1[i+1])
			s1[i+1]='x';

		pii p1=check(mat,s1[i]);
		pii p2= check(mat,s1[i+1]);

		if(p1.first ==p2.first){
			enc.push_back(mat[p1.first][((p1.second+1)%5)]);
			enc.push_back(mat[p2.first][((p2.second+1)%5)]);
		}
		else if(p1.second==p2.second){
			enc.push_back(mat[(p1.first+1)%5][p1.second]);
			enc.push_back(mat[(p2.first+1)%5][p2.second]);
		}
		else{
			enc.push_back(mat[p1.first][p2.second]);
			enc.push_back(mat[p2.first][p1.second]);
		}
	}
	cout<<"\nEncrypted string : "<<enc<<endl;

	// decription 
	string dec;
	for(int i=0;i<enc.length();i+=2)
	{
		pii p1=check(mat,enc[i]);
		pii p2=check(mat,enc[i+1]);
		if(p1.first ==p2.first)
		{
			dec.push_back(mat[p1.first][((p1.second-1+5)%5)]);
			dec.push_back(mat[p2.first][((p2.second-1+5)%5)]);
		}
		else if(p1.second==p2.second)
		{
			dec.push_back(mat[(p1.first-1+5)%5][p1.second]);
			dec.push_back(mat[(p2.first-1+5)%5][p2.second]);
		}
		else
		{
			dec.push_back(mat[p1.first][p2.second]);
			dec.push_back(mat[p2.first][p1.second]);
		}
	}
	cout<<"\n\nDecrypted String : "<<dec<<endl;
	// cout<<s<<endl;
}

int main(){
	fun();
    return 0;
}