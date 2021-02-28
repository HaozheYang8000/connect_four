# goal
make a couunect four game with an extremely strong AI. (JS a bit slow c++ can handle depth of 8 without significant lag, whereas JS only depth of 7). I translated my code from c++ to js.

# need to have
~ 1. AI with no dumb mistakes ~
 - once achieved four in a row +1000
 - once achieved three in a row +100
 - once achieved two in a row +10
 - one stands along +1
 - human score multiply by -1
 - overall score = computer score minus human score
 - local minimax search tree (depth of 6 to 8) worst case is 117649 for depth of 6 and 5764801 for depth of 8
 - alpha-beta pruning (increase depth to 7 to 9). On average the speed is increased signifiantly (3 times).
~ 2. display properly ~
 - red and yellow
 - blue background
 - flash when four are connected

# nice to have
~ 1. sounds ~
2. backgrounds
3. multiple levels
4. support 2 players mode as well
5. imporved AI
  - similar with chess AI, there shouls be positions value as well as piece value
  - ratio
  - remembering the first 28 states
  ~ - When the AI knows if the player plays perfectly in six moves it is going to lose, it is going to make a random move. However, the player might not, in this sitatation change the search depth into four to avoid th AI making a "seemingly" dumb mistake, and hope the player won't play perfectly. ~