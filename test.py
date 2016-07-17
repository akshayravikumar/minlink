c = {'A': '.-',     'B': '-...',   'C': '-.-.', 
        'D': '-..',    'E': '.',      'F': '..-.',
        'G': '--.',    'H': '....',   'I': '..',
        'J': '.---',   'K': '-.-',    'L': '.-..',
        'M': '--',     'N': '-.',     'O': '---',
        'P': '.--.',   'Q': '--.-',   'R': '.-.',
     	'S': '...',    'T': '-',      'U': '..-',
        'V': '...-',   'W': '.--',    'X': '-..-',
        'Y': '-.--',   'Z': '--..',
        
        '0': '-----',  '1': '.----',  '2': '..---',
        '3': '...--',  '4': '....-',  '5': '.....',
        '6': '-....',  '7': '--...',  '8': '---..',
        '9': '----.' 
        }

CODE = {c[a]:a for a in c}

string = "OCP AX PP OAO A      CC XCV VXX VP      OC ACP OOV CXP PAX AVOA AC"

for o in [".", "-"]:
	for c in [".", "-"]:
		for p in [".", "-"]:
			for a in [".", "-"]:
				for x in [".", "-"]:
					for v in [".", "-"]:
						conv = {"O": o, "C": c, "P":p, "X":x, "V":v, "A":a, " ": " "}
						pstring = "".join([conv[ch] for ch in string]).split(" ")
						try:
							print "".join([CODE[ch] for ch in pstring if len(ch) > 0])
						except:
							pass	