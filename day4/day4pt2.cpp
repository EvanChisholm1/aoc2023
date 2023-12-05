#include<bits/stdc++.h>

using namespace std;

vector<int> get_matching(string line) {
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
        if(in_winning_nums) {
            winning.push_back(stoi(current_numstr));
        } else {
            have.push_back(stoi(current_numstr));
        }
    }

    vector<int> matching;

    for(auto h: have) {
        for(auto w: winning) {
            if (h == w) {
                matching.push_back(h);
            }
        }
    }

    return matching;

}

int main() {
    int points = 0;
    ifstream input("input.txt");

    vector<int> instances(205, 1);

    string line;
    int current = 1;
    while(getline(input, line)) {
        vector<int> matching = get_matching(line);

        for(int i = 1; current + i <= min(199, int (current + matching.size())); i++) {
            instances[current + i] += instances[current];
        }

        current++;
    }

    int sum = 0;
    for (int i = 1; i < current; i++) {
        sum += instances[i];
    }

    cout << sum << endl;
}
