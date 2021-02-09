# goal
make a couunect four game with an extremely strong AI

# need to have
1. AI with no dumb mistakes
  - once achieved four in a row +1000
  - once achieved three in a row +100
  - once achieved two in a row +10
  - one stands along +1
  - human score multiply by -1
  - overall score = computer score minus human score
  - local minimax search tree (depth of 6~8) worst case is 117649 for depth of 6 and 5764801 for depth of 8
  - alpha-beta pruning (increase depth to 7~9). On average the speed is increased signifiantly (3 times).
2. display properly
  - red and yellow
  - blue background
  - flash when fpur are connected

# nice to have
1. sounds
2. backgrounds
3. multiple levels
4. support 2 players mode as well
5. imporved AI
  - similar with chess AI, there shouls be positions value as well as piece value
  - ratio
  - remembering the first 28 states