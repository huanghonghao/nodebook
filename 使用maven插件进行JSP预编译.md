## 使用Maven插件对JSP进行预编译

* 博文https://blog.csdn.net/anlegor/article/details/22829353

pom中添加jspc插件配置

```xml
<!-- begin precompiling jspc -->
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>jspc-maven-plugin</artifactId>
    <version>1.4.6</version>
    <executions>
        <execution>
            <id>jspc</id>
            <goals>
                <goal>compile</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
		<!--the later mentioned <sources> gets picked-->
		<sources>
	    	<directory>${basedir}/src/main/webapp</directory>
		</sources>
		<!--1.6 doesn't work!? Something lower than 1.5 seems to be the default--> 
		<verbose>1</verbose>
	</configuration>
</plugin>
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <version>2.4</version>
    <configuration>
        <webXml>${basedir}/target/jspweb.xml</webXml>
    </configuration>
</plugin>
<!-- end precompiling jspc -->
```

