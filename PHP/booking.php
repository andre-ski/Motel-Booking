<html>
<body>

<table style="width:100%">
  <tr>
    <th>Element</th>
    <th>Data</th> 
  </tr>
  <?php
  $elementKeys = array_keys($_POST);
  foreach($elementKeys as $element)
	{
			if($element=="ccn")
			{
				$chars = str_split($_POST[$element]);
				$last4 = substr($_POST[$element], strlen($_POST[$element])-4);
				$s= "";
				for($i=0; $i<count($chars)-4;$i++)
				{
					if($chars[$i] =="-")
					{
						$s=$s."-";
					}
					else 
					{
						$s = $s."*";
					}
				}
				 echo "<tr><td>".$element."</td><td>".$s.$last4."</td></tr>";
			}
			else if($element=="ccv")
			{
				$cvv="***";
				echo "<tr><td>".$element."</td><td>".$cvv."</td></tr>";
			}
			else {
					echo "<tr><td>".$element."</td><td>".$_POST[$element]."</td></tr>";
				}
	}
	echo "</table>";
			
   ?>
</table>
</body>
</html>