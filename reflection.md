# Project Reflection

## Problem One

- the wost problem that I to deal with is sound not playing. In the end I found out that chrome do not allow sound to play until the user has preformed some action. Then I forced the player to press some keys to start the game which will allow the audio to start. However, after I made the gameState = "setup", the when key is pressed, then set gameState = "play". It was not working, then I rewrote the just the sound and press key in test.js, then I transfer all my code over to the second file, and It worked. I am still not sure where the problem is.

## Problem Two

- Another problem is the AI (I coded in c++, then translated it). In c++, calculating score was not function as expected, but I did not found out. Also, the AI is making seemingly dumb mistakes, but later during debug, I found out that it is going to lose if the player plays perfectly in six moves. If this happens then I will change to search depth into 5 and hope the player not to play perfectly.

## Completed everything?

- Yes, I am done everything in "need to have" and parts of "nice to have". The sound in "nice to have" took a bit too much time. If it did not take as long, I think I might get multiple levels and double player to work.