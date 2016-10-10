#This is a python 3 file, make sure beautifulsoup and lxml is installed on your system.

import requests, bs4, lxml
req = requests.get('http://www.realmadrid.com/en/football/schedule')
bs4data = bs4.BeautifulSoup(req.text, "lxml")

homeTeam = bs4data.find('div', {'class': 'm_highlighted_next_game_team'}).strong.contents
awayTeam = bs4data.find('div', {'class': 'm_highlighted_next_game_team m_highlighted_next_game_second_team'}).strong.contents
venue = bs4data.find('p', {'class': 'm_highlighted_next_game_location'}).contents
startTime = bs4data.find('time', {'class': 'm_highlighted_next_game_time'}).contents
matchDate = bs4data.find('header', {'class': 'm_highlighted_next_game_header'}).time.contents
competition = bs4data.find('header', {'class': 'm_highlighted_next_game_header'}).p.span.contents 
	 
print("The competition is : " + competition[0])
print("The next fixture is: " + homeTeam[0] + " VS " + awayTeam[0])
print("The venue is: " + venue[0])
print("The date is: " + matchDate[0])
print("The start time is: " + startTime[0][0:5] + " (GMT + 2)")