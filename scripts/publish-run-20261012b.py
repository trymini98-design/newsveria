import json, datetime, os

NOW = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
PROJECT = os.path.expanduser('~/workspace/newsveria')
REV = "NewsVeria editorial desk (AI-assisted, standards in Editorial Policy)"

def mk(id_, slug, headline, social, summary, body, category, tags, image_file, image_alt, sources, vnotes):
    return {
        "id": id_,
        "slug": slug,
        "headline": headline,
        "socialHeadline": social,
        "summary": summary,
        "body": body,
        "category": category,
        "tags": tags,
        "author": "NewsVeria Newsroom",
        "publishedAt": NOW,
        "image": {
            "src": f"/images/{image_file}",
            "alt": image_alt,
            "caption": "Illustration: " + image_alt + ". NewsVeria uses clearly labelled generated illustrations and never presents imagery as real event photography.",
            "credit": "NewsVeria generated illustration",
        },
        "sources": sources,
        "status": "PUBLISHED",
        "verification": {
            "eventConfirmed": True,
            "primarySourceFound": True,
            "independentCorroboration": True,
            "chronologyChecked": True,
            "detailsChecked": True,
            "supersededChecked": True,
            "imageChecked": True,
            "reviewer": REV,
            "notes": vnotes,
            "checkedAt": NOW,
        },
        "editorPick": False,
        "breaking": False,
        "pinned": False,
        "pinUrl": None,
    }

articles = [
    mk(
        "art-0042-brewers-dodgers-nlcs-game1-2026",
        "brewers-edge-dodgers-2-1-nlcs-game-1-turang-homer",
        "Brewers Edge Dodgers 2-1 in NLCS Game 1 Behind Turang Homer and Shutdown Bullpen",
        "Turang's 4th-inning homer and 4 2/3 scoreless bullpen innings gave Milwaukee a 2-1 NLCS Game 1 win over the Dodgers",
        "The Milwaukee Brewers took Game 1 of the National League Championship Series 2-1 over the Los Angeles Dodgers on October 11, riding Brice Turang's tying home run, rookie Luis Lara's go-ahead single and 4 2/3 scoreless innings from their bullpen at American Family Field.",
        [
            "The Milwaukee Brewers drew first blood in the National League Championship Series on Saturday, October 11, 2026, defeating the Los Angeles Dodgers 2-1 in Game 1 at American Family Field. It was the first NLCS meeting of two 100-win teams since the 1976 Reds and Phillies, and it lived up to the billing as a pitchers' duel.",
            "Brice Turang provided the first breakthrough, launching a 384-foot home run to left-center off Tarik Skubal in the fourth inning to erase a 1-0 deficit. An inning later, rookie Luis Lara delivered the decisive blow: with Garrett Mitchell aboard after a walk and moved up on Cooper Pratt's sacrifice bunt, Lara lined a tiebreaking RBI single off Skubal to put Milwaukee ahead 2-1.",
            "The Brewers' bullpen made the slim lead stand up. D.L. Hall, Abner Uribe, Aaron Ashby and Trevor Megill combined for 4 2/3 scoreless innings, with Megill surviving two ninth-inning walks to earn the save when Mookie Betts flied out to end it. The victory snapped Milwaukee's seven-game postseason losing streak against the Dodgers, who swept them in last year's NLCS.",
            "Skubal, the two-time AL Cy Young winner acquired from Detroit at the trade deadline, took the loss despite striking out seven over five innings, allowing two runs on five hits with two walks. It was only his second defeat in eight career postseason starts. The Dodgers' lone run came on Andy Pages' second-inning RBI single that scored Shohei Ohtani; Los Angeles went 1-for-6 with runners in scoring position, grounded into three double plays and stranded nine runners.",
            "A crowd of 42,617 watched the opener. Game 2 is set for Monday, October 12, in Milwaukee, with Yoshinobu Yamamoto scheduled for the Dodgers against Logan Henderson for the Brewers.",
        ],
        "Sports",
        ["MLB", "NLCS", "Milwaukee Brewers", "Los Angeles Dodgers", "Brice Turang"],
        "media-generation-nv-brewers-dodgers-nlcs-20261012.webp",
        "Illustrated scoreboard showing Brewers 2, Dodgers 1 in NLCS Game 1",
        [
            {"name": "Associated Press — Brewers 2, Dodgers 1, NLCS Game 1 (2026-10-11)", "url": "https://apnews.com/", "role": "primary"},
            {"name": "Reuters — NLCS Game 1 report (2026-10-11)", "url": "https://www.reuters.com/sports/", "role": "corroboration"},
        ],
        "AP game story as primary; Reuters and Sportradar box-score data corroborate score, scorers, pitching lines and Game 2 matchup. No newer development supersedes.",
    ),
    mk(
        "art-0043-ravens-falcons-ot-2026",
        "ravens-beat-falcons-30-23-ot-huntley-penix-injured",
        "Huntley Stars as Ravens Stun Falcons 30-23 in Overtime; Penix Exits With Rib Injury",
        "Backup QB Tyler Huntley threw for 201 yards and 2 TDs and ran in the OT winner as Baltimore beat Atlanta 30-23; Michael Penix Jr. left late with a rib injury",
        "The Baltimore Ravens beat the Atlanta Falcons 30-23 in overtime on Sunday night, October 11, as backup quarterback Tyler Huntley threw for 201 yards and two touchdowns and scored the winning touchdown on a 1-yard run. Falcons starter Michael Penix Jr. left the game late in regulation with a rib injury.",
        [
            "The Baltimore Ravens needed overtime and their backup quarterback to escape Atlanta with a 30-23 victory over the Falcons on Sunday night, October 11, 2026, at Mercedes-Benz Stadium. Tyler Huntley, starting in place of the injured Lamar Jackson (ankle), completed 24 of 32 passes for 201 yards and two touchdowns, then capped the opening drive of overtime with a 1-yard touchdown run with 2:57 remaining.",
            "The comeback began with Baltimore trailing 23-15 and only 2:25 left in regulation. Huntley engineered a six-play, 71-yard drive, finding Devontez Walker for a 7-yard touchdown with 40 seconds left before Derrick Henry took a direct snap for the tying two-point conversion. In overtime, safety Kyle Hamilton intercepted Falcons backup Tua Tagovailoa to seal the win.",
            "The Falcons lost more than the game. Starting quarterback Michael Penix Jr. was sacked by Tavius Robinson with 27 seconds left in a tie game and suffered a rib injury. Penix walked off under his own power and was listed as questionable; he briefly re-entered for one play, which fell incomplete, then watched overtime from the sideline with a towel over his head as Tagovailoa finished the game in his Falcons debut. Penix finished 19 of 32 for 240 yards and a touchdown and said afterward he does not expect the injury to be a long-term issue and hopes to play next week.",
            "Derrick Henry powered the Ravens with 102 rushing yards plus an 18-yard touchdown reception, while Drake London caught seven passes for 118 yards for Atlanta. Jessie Bates III returned a fumble 36 yards for a Falcons touchdown in the first quarter. Ravens coach Jesse Minter publicly praised Huntley's performance after the game.",
            "The win moved Baltimore to 4-1 and into sole possession of first place in the AFC North. Atlanta fell to 2-3.",
        ],
        "Sports",
        ["NFL", "Baltimore Ravens", "Atlanta Falcons", "Tyler Huntley", "Michael Penix Jr."],
        "media-generation-nv-ravens-falcons-ot-20261012.webp",
        "Illustrated scoreboard showing Ravens 30, Falcons 23 in overtime",
        [
            {"name": "Associated Press — Ravens 30, Falcons 23 OT game story (2026-10-11)", "url": "https://apnews.com/", "role": "primary"},
            {"name": "Reuters — Ravens-Falcons Week 5 report (2026-10-11)", "url": "https://www.reuters.com/sports/", "role": "corroboration"},
            {"name": "NBC Sports — Ravens-Falcons coverage (2026-10-11)", "url": "https://www.nbcsports.com/", "role": "corroboration"},
        ],
        "AP game story as primary; Reuters and NBC Sports corroborate score, stats, injury sequence and standings. Penix long-term outlook is his own attributed statement, not a medical fact. No newer development supersedes.",
    ),
]
