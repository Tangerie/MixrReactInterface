for i in *.mov
do 
	ffmpeg -i "$i" -pix_fmt rgb24 -r 15 -vf scale=1024:-1 "${i%.*}.gif" -n
	rm "$i"	
done
