package org.irgrupp;

import java.io.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = null;
        BufferedWriter bw = null;
        try {
            br = new BufferedReader(new FileReader("alla_filer_svenska_wiki.xml"));
            bw = new BufferedWriter(new FileWriter("ut.json"));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        String line;
        Pattern pattern = Pattern.compile("Fil:(.*)");
        int i = 0;
        bw.write("[\n");
        while ((line = br.readLine()) != null) {
            String splits[] = line.split("\\|");

            Matcher matcher = pattern.matcher(splits[0]);

            String end = splits[splits.length - 1];

            end = end.replace("]", "");
            end = end.replace("[", "");
            end = end.replace("'", "");
            end = end.replace("&lt;", "");
            end = end.replace("&gt;", "");
            end = end.replace("&quot;", "");
            end = end.replace("&amp;", "");
            end = end.replace("(", "");
            end = end.replace(")", "");
            end = end.replace("//ref", "");


            if (matcher.find()) {
                bw.write("{\"name\": \"" + matcher.group(1) + "\"" + ", \"description\": \"" + end + "\"}, \n");
            }
        }
        bw.write("]\n");
        bw.close();
        br.close();
    }

}
