package com.example.wbdvs21srilekhanuliserverjava.controllers;

import com.example.wbdvs21srilekhanuliserverjava.models.Widget;
import com.example.wbdvs21srilekhanuliserverjava.services.WidgetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class WidgetController {

  @Autowired
  WidgetService service;

  @PostMapping("/api/topics/{tid}/widgets")
  public Widget createWidgetForTopic(
          @PathVariable("tid") String topicId,
          @RequestBody Widget widget) {
    return service.createWidget(topicId, widget);
  }

  @GetMapping("/api/topics/{tid}/widgets")
  public List<Widget> findWidgetsForTopic(
          @PathVariable("tid") String topicId
  ) {
    return service.findWidgetsForTopic(topicId);
  }

  @GetMapping("/api/widgets")
  public List<Widget> findAllWidgets() {
    return service.findAllWidgets();
  }

  @GetMapping("/api/widgets/{wid}")
  public Widget findWidgetById(
          @PathVariable("wid") Long id) {
    return service.findWidgetById(id);
  }

  @PutMapping("/api/widgets/{wid}")
  public int updateWidget(
          @PathVariable("wid") Long id, @RequestBody Widget w) {
    return service.updateWidget(id, w);
  }

  @DeleteMapping("/api/widgets/{wid}")
  public int deleteWidget(
          @PathVariable("wid") Long id) {
            return service.deleteWidget(id);
  }

}