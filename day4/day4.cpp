#include<bits/stdc++.h>

using namespace std;

int main() {
    int points = 0;
    ifstream input("input.txt");

    string line;
    while(getline(input, line)) {
        bool passed_colon = false;
        string current_numstr = "";
        bool in_winning_nums = true;

        vector<int> winning;
        vector<int> have;

        for (int i = 0; i < line.size(); i++) {
            if(line[i] == ':') {
                passed_colon = true;
                continue;
            }
            if(!passed_colon) continue;

            if(line[i] == '|') {
                in_winning_nums = false;
                continue;
            }

            if(line[i] == ' ' && current_numstr != " ") {
                if(current_numstr != "") {
                    // cout << '"' << current_numstr << '"' << endl;
                    if(in_winning_nums) {
                        winning.push_back(stoi(current_numstr));
                    } else {
                        have.push_back(stoi(current_numstr));
                    }
                }

                current_numstr = "";
                continue;
            }


            current_numstr += line[i];
        }

        if(current_numstr != "") {
            // cout << '"' << current_numstr << '"' << endl;
            if(in_winning_nums) {
                winning.push_back(stoi(current_numstr));
            } else {
                have.push_back(stoi(current_numstr));
            }
        }

        // cout << "winning numbers ";
        // for(auto x: winning) cout << x << " ";
        // cout << endl << "have: ";
        // for(auto x: have) cout << x << " ";

        int card_points = 0;

        for(auto h: have) {
            for(auto w: winning) {
                if (h == w) {
                    if(card_points == 0) {
                        card_points = 1;
                    } else {
                        card_points = card_points * 2;
                    }
                }
            }
        }

        points += card_points;
    }

    cout << points << endl;
}
